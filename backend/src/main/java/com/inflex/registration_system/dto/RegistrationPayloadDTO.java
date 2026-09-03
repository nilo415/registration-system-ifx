package com.inflex.registration_system.dto;

import lombok.Data;

import java.util.List;

/**
 * Main DTO representing the full registration form payload
 * sent by the React frontend wizard.
 *
 * Uses Lombok @Data to auto-generate getters, setters,
 * equals, hashCode and toString — no boilerplate needed.
 *
 * Fields are grouped by wizard step for readability.
 */
@Data
public class RegistrationPayloadDTO {

    // ── Step 1 – Company Identity ──────────────────────────────────────────
    private String cnpj;
    private String companyName;
    private String tradeName;
    private String openingDate;
    private String legalNature;
    private String businessActivity;        // CNAE code / description

    // ── Step 2 – Address ───────────────────────────────────────────────────
    private String zipCode;
    private String street;
    private String number;
    private String complement;
    private String neighborhood;
    private String city;
    private String state;
    private String country;

    // ── Step 3 – Contact ───────────────────────────────────────────────────
    private String phone;
    private String email;
    private String website;

    // ── Step 4 – Tax & Financial ───────────────────────────────────────────
    private String taxRegime;               // e.g. "Simples Nacional", "Lucro Real"
    private String stateRegistration;       // Inscrição Estadual
    private String municipalRegistration;   // Inscrição Municipal

    // ── Step 5 – Legal Representatives ────────────────────────────────────
    private List<RepresentativeDTO> representatives;

    // ── Step 6 – Uploaded Documents (file names only; binaries go via /upload) ─
    private List<String> documentFileNames;

    // ── Metadata ───────────────────────────────────────────────────────────
    private String status;      // "DRAFT" or "FINALIZED"
    private String savedAt;     // ISO-8601 timestamp set by the backend

    // ──────────────────────────────────────────────────────────────────────
    // Inner DTO
    // ──────────────────────────────────────────────────────────────────────

    /**
     * Represents a single legal representative of the company (Step 5).
     */
    @Data
    public static class RepresentativeDTO {

        private String fullName;
        private String cpf;
        private String role;            // e.g. "CEO", "Director", "Partner"
        private String email;
        private String phone;
        private boolean signatory;      // whether this person signs contracts
    }
}
