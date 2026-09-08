package com.inflex.registration_system.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;
import java.util.Map;

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
@JsonIgnoreProperties(ignoreUnknown = true)
public class RegistrationPayloadDTO {

    // ── Step 0 – Operation Type ───────────────────────────────────────────
    private String operationType;

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
    private String contactPerson;
    private String phone;
    private String mobilePhone;
    private String email;
    private String purchasingEmail;
    private String website;

    // ── Financial Address & Contact ─────────────────────────────────────────
    private String financialContact;
    private String financialZipCode;
    private String financialStreet;
    private String financialNeighborhood;
    private String financialCity;
    private String financialState;
    private String financialPhone;
    private String financialMobilePhone;
    private String financialEmail;

    // ── Delivery Address & Contact ──────────────────────────────────────────
    private String deliveryZipCode;
    private String deliveryStreet;
    private String deliveryNeighborhood;
    private String deliveryCity;
    private String deliveryState;
    private String deliveryContact;
    private String deliveryPhone;
    private String deliveryObservation;

    // ── Step 4 – Tax & Financial ───────────────────────────────────────────
    private String taxRegime;               // e.g. "Simples Nacional", "Lucro Real"
    private String stateRegistration;       // Inscrição Estadual
    private String municipalRegistration;   // Inscrição Municipal
    private Boolean simplesNacional;
    private Boolean ipiExemption;
    private Boolean suframaDiscount;
    private String suframaNumber;
    private Boolean cdiIncentive;
    private Boolean requiresPurchaseOrder;

    // ── Step 5 – Legal Representatives & References ────────────────────────
    private List<RepresentativeDTO> representatives;
    private List<Map<String, Object>> bankReferences;
    private List<Map<String, Object>> commercialReferences;

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
