package com.inflex.registration_system.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.time.Instant;

/**
 * Service responsible for binary file system operations.
 *
 * <p>After the SQLite migration, this service no longer handles the registration
 * JSON payload — that responsibility has moved to {@link RegistrationService}.
 * This class retains only the following concerns:
 * <ul>
 *   <li>Saving binary file attachments uploaded by the frontend.</li>
 *   <li>Ensuring the storage directory exists on startup.</li>
 * </ul>
 * </p>
 */
@Service
public class FileManagerService {

    private static final Logger log = LoggerFactory.getLogger(FileManagerService.class);

    /** Resolved absolute path to the local storage directory. */
    private final Path storageDir;

    public FileManagerService(
            @Value("${app.storage.directory:./local_data}") String storagePath) {
        this.storageDir = Paths.get(storagePath).toAbsolutePath().normalize();
        ensureDirectoryExists();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Public API
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Saves an uploaded file (PDF, image, etc.) into the storage directory.
     *
     * @param cnpj the CNPJ that owns this document (used for logging only)
     * @param file the multipart file sent by the frontend
     * @return the absolute path where the file was saved
     * @throws IOException if the file cannot be written
     */
    public Path saveUploadedFile(String cnpj, MultipartFile file) throws IOException {
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

        log.info("File uploaded → {} ({} bytes) | CNPJ: {}", destination, file.getSize(), cnpj);
        return destination;
    }

    /**
     * Returns the resolved absolute path to the storage directory.
     * Used by {@link PdfGeneratorService} to know where to write the PDF.
     *
     * @return the storage directory path
     */
    public Path getStorageDir() {
        return storageDir;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Private helpers
    // ─────────────────────────────────────────────────────────────────────────

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
