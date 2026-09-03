package com.inflex.registration_system.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.inflex.registration_system.dto.RegistrationPayloadDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.time.Instant;
import java.util.stream.Stream;

/**
 * Core service responsible for all local file system operations.
 *
 * Business rules:
 *  - JSON payload and uploaded binaries (PDFs, images) are stored in
 *    a single configurable directory (default: ./local_data/).
 *  - If the incoming CNPJ differs from the one already persisted,
 *    the directory is wiped clean before any new data is written.
 *  - Only one "active registration" exists at a time on disk.
 */
@Service
public class FileManagerService {

    private static final Logger log = LoggerFactory.getLogger(FileManagerService.class);

    /** JSON file name that holds the current registration payload. */
    private static final String REGISTRATION_FILE = "registration.json";

    /** Jackson mapper — configured once and reused. */
    private final ObjectMapper mapper;

    /** Resolved path to the local storage directory. */
    private final Path storageDir;

    public FileManagerService(@Value("${app.storage.directory:./local_data}") String storagePath) {
        this.storageDir = Paths.get(storagePath).toAbsolutePath().normalize();
        this.mapper = new ObjectMapper()
                .enable(SerializationFeature.INDENT_OUTPUT); // pretty-print JSON
        ensureDirectoryExists();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Public API
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Saves the registration payload as JSON.
     * If the CNPJ changed, the storage directory is wiped first.
     *
     * @param payload the DTO received from the frontend
     * @throws IOException if the file cannot be written
     */
    public void saveRegistration(RegistrationPayloadDTO payload) throws IOException {
        clearDirectoryIfCnpjChanged(payload.getCnpj());

        // Stamp the save time on the server side
        payload.setSavedAt(Instant.now().toString());

        Path jsonPath = storageDir.resolve(REGISTRATION_FILE);
        mapper.writeValue(jsonPath.toFile(), payload);

        log.info("Registration saved → {} | CNPJ: {} | Status: {}",
                jsonPath, payload.getCnpj(), payload.getStatus());
    }

    /**
     * Saves an uploaded file (PDF, image, etc.) into the storage directory.
     * If the CNPJ changed, the directory is wiped first.
     *
     * @param cnpj the CNPJ that owns this document
     * @param file the multipart file sent by the frontend
     * @return the absolute path where the file was saved
     * @throws IOException if the file cannot be written
     */
    public Path saveUploadedFile(String cnpj, MultipartFile file) throws IOException {
        clearDirectoryIfCnpjChanged(cnpj);

        String originalName = file.getOriginalFilename();
        if (originalName == null || originalName.isBlank()) {
            originalName = "document_" + Instant.now().toEpochMilli();
        }

        // Sanitize: keep only safe characters to prevent path traversal
        String safeName = originalName.replaceAll("[^a-zA-Z0-9._\\-]", "_");
        Path destination = storageDir.resolve(safeName);

        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, destination, StandardCopyOption.REPLACE_EXISTING);
        }

        log.info("File uploaded → {} ({} bytes)", destination, file.getSize());
        return destination;
    }

    /**
     * Reads and returns the current registration payload from disk.
     *
     * @return the persisted DTO, or {@code null} if no registration exists yet
     * @throws IOException if the file exists but cannot be read
     */
    public RegistrationPayloadDTO readCurrentRegistration() throws IOException {
        Path jsonPath = storageDir.resolve(REGISTRATION_FILE);

        if (!Files.exists(jsonPath)) {
            log.info("No registration found on disk.");
            return null;
        }

        RegistrationPayloadDTO payload = mapper.readValue(jsonPath.toFile(), RegistrationPayloadDTO.class);
        log.info("Registration read from disk → CNPJ: {} | Status: {}",
                payload.getCnpj(), payload.getStatus());
        return payload;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Private helpers
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Compares the incoming CNPJ with the one already on disk.
     * If they differ (or the disk is empty), wipes the storage directory.
     */
    private void clearDirectoryIfCnpjChanged(String incomingCnpj) throws IOException {
        Path jsonPath = storageDir.resolve(REGISTRATION_FILE);

        if (!Files.exists(jsonPath)) {
            // Nothing saved yet — no need to clear
            return;
        }

        try {
            RegistrationPayloadDTO existing = mapper.readValue(jsonPath.toFile(), RegistrationPayloadDTO.class);
            String savedCnpj = existing.getCnpj();

            boolean cnpjChanged = savedCnpj != null && !savedCnpj.equals(incomingCnpj);

            if (cnpjChanged) {
                log.warn("CNPJ changed from {} to {}. Wiping storage directory.", savedCnpj, incomingCnpj);
                clearDirectory();
            }

        } catch (IOException e) {
            // If the JSON is corrupt, clean everything and start fresh
            log.error("Could not parse existing registration.json. Wiping directory.", e);
            clearDirectory();
        }
    }

    /**
     * Deletes every file inside the storage directory (does NOT delete the directory itself).
     */
    private void clearDirectory() throws IOException {
        try (Stream<Path> entries = Files.list(storageDir)) {
            entries.filter(Files::isRegularFile).forEach(file -> {
                try {
                    Files.delete(file);
                    log.info("Deleted old file → {}", file.getFileName());
                } catch (IOException e) {
                    log.error("Failed to delete file: {}", file, e);
                }
            });
        }
    }

    /**
     * Creates the storage directory on startup if it does not exist.
     */
    private void ensureDirectoryExists() {
        try {
            Files.createDirectories(storageDir);
            log.info("Storage directory ready → {}", storageDir);
        } catch (IOException e) {
            throw new IllegalStateException(
                    "Cannot create storage directory: " + storageDir, e);
        }
    }
}
