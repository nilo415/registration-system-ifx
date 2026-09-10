package com.inflex.registration_system.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.inflex.registration_system.dto.RegistrationPayloadDTO;
import com.inflex.registration_system.entity.RegistrationEntity;
import com.inflex.registration_system.repository.RegistrationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;

/**
 * One-shot migration runner that executes on startup.
 *
 * <p>If a legacy {@code registration.json} file is found in the storage directory
 * (left over from the file-based persistence era), its contents are imported into
 * the SQLite database and the file is renamed to {@code registration.json.migrated}
 * so the runner does not re-import it on subsequent startups.</p>
 *
 * <p>This class is safe to keep in the codebase permanently — it is a no-op when
 * no legacy file is present.</p>
 */
@Component
public class DataMigrationRunner implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataMigrationRunner.class);

    private static final String LEGACY_FILE = "registration.json";
    private static final String MIGRATED_SUFFIX = ".migrated";

    private final RegistrationRepository repository;
    private final ObjectMapper objectMapper;
    private final Path storageDir;

    public DataMigrationRunner(
            RegistrationRepository repository,
            ObjectMapper objectMapper,
            @Value("${app.storage.directory:./local_data}") String storagePath) {
        this.repository   = repository;
        this.objectMapper = objectMapper;
        this.storageDir   = Paths.get(storagePath).toAbsolutePath().normalize();
    }

    @Override
    public void run(String... args) {
        Path legacyFile = storageDir.resolve(LEGACY_FILE);

        if (!Files.exists(legacyFile)) {
            log.info("Migration runner: no legacy registration.json found — skipping.");
            return;
        }

        log.info("Migration runner: found legacy file → {}. Importing into SQLite…", legacyFile);

        try {
            RegistrationPayloadDTO dto =
                    objectMapper.readValue(legacyFile.toFile(), RegistrationPayloadDTO.class);

            String cnpj = dto.getCnpj();

            // Skip if this CNPJ is already in the database
            if (cnpj != null && repository.findTopByCnpjOrderByUpdatedAtDesc(cnpj).isPresent()) {
                log.info("Migration runner: CNPJ {} already in DB — skipping import.", cnpj);
            } else {
                String json = objectMapper.writeValueAsString(dto);

                RegistrationEntity entity = new RegistrationEntity();
                entity.setCnpj(cnpj);
                entity.setStatus(dto.getStatus() != null ? dto.getStatus() : "DRAFT");
                entity.setSavedAt(dto.getSavedAt() != null ? dto.getSavedAt() : Instant.now().toString());
                entity.setPayloadJson(json);

                repository.save(entity);
                log.info("Migration runner: imported CNPJ {} with id {}.", cnpj, entity.getId());
            }

            // Rename the legacy file so it won't be re-processed
            Path migratedFile = storageDir.resolve(LEGACY_FILE + MIGRATED_SUFFIX);
            Files.move(legacyFile, migratedFile, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
            log.info("Migration runner: renamed legacy file → {}", migratedFile.getFileName());

        } catch (IOException e) {
            log.error("Migration runner: failed to import legacy registration.json — skipping.", e);
        }
    }
}
