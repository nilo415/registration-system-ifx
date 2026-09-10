package com.inflex.registration_system.controller;

import com.inflex.registration_system.dto.RegistrationPayloadDTO;
import com.inflex.registration_system.service.FileManagerService;
import com.inflex.registration_system.service.RegistrationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
 *  POST   /draft    → saves the current wizard state as a draft (DB)
 *  POST   /finalize → marks the registration as finalized (DB + PDF)
 *  POST   /upload   → receives a single file attachment (disk)
 *  GET    /current  → returns the most recently saved registration (DB)
 */
@Tag(name = "Registration", description = "Pre-registration wizard endpoints")
@RestController
@RequestMapping("/api/registration")
public class RegistrationController {

    private static final Logger log = LoggerFactory.getLogger(RegistrationController.class);

    /** DB-backed service — handles draft/finalize persistence. */
    private final RegistrationService registrationService;

    /** File-system service — still handles binary file uploads. */
    private final FileManagerService fileManagerService;

    public RegistrationController(RegistrationService registrationService,
                                  FileManagerService fileManagerService) {
        this.registrationService = registrationService;
        this.fileManagerService  = fileManagerService;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/registration/draft
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Saves the registration payload as a DRAFT in the database.
     *
     * @param payload the full wizard payload from the frontend
     * @return 200 OK with a confirmation message
     */
    @Operation(summary = "Save registration as draft")
    @PostMapping("/draft")
    public ResponseEntity<Map<String, String>> saveDraft(
            @RequestBody RegistrationPayloadDTO payload) {

        log.info("POST /draft — CNPJ: {}", payload.getCnpj());
        payload.setStatus("DRAFT");

        try {
            registrationService.saveRegistration(payload);
            return ResponseEntity.ok(Map.of(
                    "status",  "success",
                    "message", "Draft saved successfully."
            ));
        } catch (Exception e) {
            log.error("Failed to save draft", e);
            return ResponseEntity.internalServerError().body(Map.of(
                    "status",  "error",
                    "message", "Failed to save draft: " + e.getMessage()
            ));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/registration/finalize
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Saves the registration payload as FINALIZED and generates the PDF.
     *
     * @param payload the full wizard payload from the frontend
     * @return 200 OK with a confirmation message
     */
    @Operation(summary = "Finalize registration and generate PDF")
    @PostMapping("/finalize")
    public ResponseEntity<Map<String, String>> finalizeRegistration(
            @RequestBody RegistrationPayloadDTO payload) {

        log.info("POST /finalize — CNPJ: {}", payload.getCnpj());
        payload.setStatus("FINALIZED");

        try {
            registrationService.saveRegistration(payload);
            return ResponseEntity.ok(Map.of(
                    "status",  "success",
                    "message", "Registration finalized successfully."
            ));
        } catch (Exception e) {
            log.error("Failed to finalize registration", e);
            return ResponseEntity.internalServerError().body(Map.of(
                    "status",  "error",
                    "message", "Failed to finalize registration: " + e.getMessage()
            ));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // POST /api/registration/upload
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Receives a single file (PDF, image, etc.) and saves it to local disk.
     *
     * @param cnpj the CNPJ that owns the document
     * @param file the multipart file sent by the frontend
     * @return 200 OK with the saved file name
     */
    @Operation(summary = "Upload a document attachment")
    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(
            @RequestParam("cnpj") String cnpj,
            @RequestParam("file") MultipartFile file) {

        log.info("POST /upload — CNPJ: {} | file: {} ({} bytes)",
                cnpj, file.getOriginalFilename(), file.getSize());

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status",  "error",
                    "message", "No file provided or file is empty."
            ));
        }

        try {
            Path saved = fileManagerService.saveUploadedFile(cnpj, file);
            return ResponseEntity.ok(Map.of(
                    "status",   "success",
                    "message",  "File uploaded successfully.",
                    "fileName", saved.getFileName().toString()
            ));
        } catch (IOException e) {
            log.error("Failed to upload file", e);
            return ResponseEntity.internalServerError().body(Map.of(
                    "status",  "error",
                    "message", "Failed to upload file: " + e.getMessage()
            ));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET /api/registration/current
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Returns the most recently saved registration from the database.
     * Returns 204 No Content if no registration exists yet.
     *
     * @return the current {@link RegistrationPayloadDTO}, or 204 if empty
     */
    @Operation(summary = "Retrieve the latest saved registration")
    @GetMapping("/current")
    public ResponseEntity<RegistrationPayloadDTO> getCurrent() {

        log.info("GET /current");

        try {
            RegistrationPayloadDTO current = registrationService.readCurrentRegistration();

            if (current == null) {
                return ResponseEntity.noContent().build(); // 204
            }

            return ResponseEntity.ok(current); // 200
        } catch (Exception e) {
            log.error("Failed to read current registration", e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
