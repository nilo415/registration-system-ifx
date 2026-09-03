package com.inflex.registration_system.controller;

import com.inflex.registration_system.dto.RegistrationPayloadDTO;
import com.inflex.registration_system.service.FileManagerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.Map;

/**
 * REST controller that exposes the registration endpoints to the React frontend.
 *
 * Base path : /api/registration
 *
 * Endpoints:
 *  POST   /draft    → saves the current wizard state as a draft
 *  POST   /finalize → marks the registration as finalized
 *  POST   /upload   → receives a single file attachment
 *  GET    /current  → returns the registration currently saved on disk
 */
@RestController
@RequestMapping("/api/registration")
public class RegistrationController {

    private static final Logger log = LoggerFactory.getLogger(RegistrationController.class);

    private final FileManagerService fileManagerService;

    public RegistrationController(FileManagerService fileManagerService) {
        this.fileManagerService = fileManagerService;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/registration/draft
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Saves the registration payload as a DRAFT.
     * If the CNPJ changed, the storage directory is wiped first.
     *
     * @param payload the full wizard payload from the frontend
     * @return 200 OK with a confirmation message
     */
    @PostMapping("/draft")
    public ResponseEntity<Map<String, String>> saveDraft(
            @RequestBody RegistrationPayloadDTO payload) {

        log.info("POST /draft — CNPJ: {}", payload.getCnpj());
        payload.setStatus("DRAFT");

        try {
            fileManagerService.saveRegistration(payload);
            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "Draft saved successfully."
            ));
        } catch (IOException e) {
            log.error("Failed to save draft", e);
            return ResponseEntity.internalServerError().body(Map.of(
                    "status", "error",
                    "message", "Failed to save draft: " + e.getMessage()
            ));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/registration/finalize
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Saves the registration payload as FINALIZED.
     * If the CNPJ changed, the storage directory is wiped first.
     *
     * @param payload the full wizard payload from the frontend
     * @return 200 OK with a confirmation message
     */
    @PostMapping("/finalize")
    public ResponseEntity<Map<String, String>> finalizeRegistration(
            @RequestBody RegistrationPayloadDTO payload) {

        log.info("POST /finalize — CNPJ: {}", payload.getCnpj());
        payload.setStatus("FINALIZED");

        try {
            fileManagerService.saveRegistration(payload);
            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "Registration finalized successfully."
            ));
        } catch (IOException e) {
            log.error("Failed to finalize registration", e);
            return ResponseEntity.internalServerError().body(Map.of(
                    "status", "error",
                    "message", "Failed to finalize registration: " + e.getMessage()
            ));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/registration/upload
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Receives a single file (PDF, image, etc.) and saves it to local storage.
     * The CNPJ must be passed as a request parameter to enforce the cleanup rule.
     *
     * @param cnpj the CNPJ that owns the document
     * @param file the multipart file sent by the frontend
     * @return 200 OK with the saved file name
     */
    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(
            @RequestParam("cnpj") String cnpj,
            @RequestParam("file") MultipartFile file) {

        log.info("POST /upload — CNPJ: {} | file: {} ({} bytes)",
                cnpj, file.getOriginalFilename(), file.getSize());

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", "No file provided or file is empty."
            ));
        }

        try {
            Path saved = fileManagerService.saveUploadedFile(cnpj, file);
            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "File uploaded successfully.",
                    "fileName", saved.getFileName().toString()
            ));
        } catch (IOException e) {
            log.error("Failed to upload file", e);
            return ResponseEntity.internalServerError().body(Map.of(
                    "status", "error",
                    "message", "Failed to upload file: " + e.getMessage()
            ));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/registration/current
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Returns the registration currently persisted on disk.
     * Returns 204 No Content if no registration has been saved yet.
     *
     * @return the current RegistrationPayloadDTO, or 204 if empty
     */
    @GetMapping("/current")
    public ResponseEntity<RegistrationPayloadDTO> getCurrent() {

        log.info("GET /current");

        try {
            RegistrationPayloadDTO current = fileManagerService.readCurrentRegistration();

            if (current == null) {
                return ResponseEntity.noContent().build(); // 204
            }

            return ResponseEntity.ok(current); // 200
        } catch (IOException e) {
            log.error("Failed to read current registration", e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
