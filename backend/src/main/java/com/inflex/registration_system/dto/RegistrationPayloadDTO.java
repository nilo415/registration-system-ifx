package com.inflex.registration_system.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Main DTO representing the full registration form payload
 * sent by the React frontend wizard and used for PDF generation.
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RegistrationPayloadDTO {

    // ── Metadata & Template Header ─────────────────────────────────────────
    private String revisionCapa = "10";   // Revisão da Capa (Página 1)
    private String revisionFicha = "5";   // Revisão da Ficha Cadastral (Página 2)
    /** @deprecated use revisionCapa / revisionFicha instead */
    private String revision;
    private String status;              // "DRAFT" or "FINALIZED"
    private String savedAt;             // ISO-8601 timestamp set by the backend

    // ── Step 0 – Operation Type ───────────────────────────────────────────
    private String operationType;

    // ── Step 1 – Company Identity ──────────────────────────────────────────
    private String cnpj;
    private String companyName;
    private String tradeName;
    private String openingDate;
    private String legalNature;

    @JsonAlias({"segmentoMercado", "segmento_mercado"})
    private String businessActivity;        // CNAE code / description

    private String commercialRegistry;     // Junta Comercial

    @JsonAlias({"tipoCliente", "tipo_cliente"})
    private String clientType;             // Tipo de cliente

    @JsonAlias({"grupoCliente", "grupo_cliente"})
    private String clientGroup;            // Grupo de clientes

    // ── Step 2 – Address ───────────────────────────────────────────────────
    private String zipCode;
    private String street;
    private String number;
    private String complement;
    private String neighborhood;
    private String city;
    private String state;
    private String country;
    private String poBox;                  // Caixa Postal

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
    private String financialNumber;
    private String financialComplement;
    private String financialNeighborhood;
    private String financialCity;
    private String financialState;
    private String financialPoBox;         // Cx. Postal financeira
    private String financialPhone;
    private String financialMobilePhone;
    private String financialEmail;

    // ── Delivery Address & Contact ──────────────────────────────────────────
    private String deliveryZipCode;
    private String deliveryStreet;
    private String deliveryNumber;
    private String deliveryComplement;
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
    private Boolean brasilApiSimplesOption;
    private Boolean brasilApiMeiOption;
    private String brasilApiSimplesOptionDate;
    private String brasilApiSimplesExclusionDate;
    private String brasilApiMeiOptionDate;
    private String brasilApiMeiExclusionDate;
    private Boolean simplesNacional = false;
    private Boolean ipiExemption = false;
    private Boolean ipiSuspension = false;
    private Boolean suframaDiscount = false;
    private String suframaNumber;
    private Boolean cdiIncentive = false;
    private Boolean requiresPurchaseOrder = false;

    @JsonAlias({"tesPadrao", "tes_padrao"})
    private String tesDefault;

    private String creditLimit;
    private String creditAnalysis;

    // ── Checklist Documentos ───────────────────────────────────────────────
    private Boolean hasFichaCadastral = true;
    private Boolean hasBuscaCep = false;
    private Boolean hasSerasa = false;
    private Boolean hasComprovanteCnpj = false;
    private Boolean hasContratoSocial = false;
    private Boolean hasUltimaAlteracao = false;
    private Boolean hasComprovanteEstadual = false;
    private Boolean hasDeclaracaoIpi = false;
    private Boolean hasComprovanteSuframa = false;

    // ── Step 5 – Legal Representatives & References ────────────────────────
    private List<RepresentativeDTO> representatives = new ArrayList<>();
    private List<Map<String, Object>> bankReferences = new ArrayList<>();
    private List<Map<String, Object>> commercialReferences = new ArrayList<>();

    // ── Step 6 – Uploaded Documents ────────────────────────────────────────
    private List<String> documentFileNames = new ArrayList<>();

    // ── Approvals & Signatures ─────────────────────────────────────────────
    @JsonAlias({"representante", "representante_vendas"})
    private String salesRepresentative;

    @JsonAlias({"informacoesObtidasPor", "informacoes_obtidas_por"})
    private String preparedBy;
    private String preparedAt;
    private String preparedAtDate;
    private String approvedBy;
    private String approvedAt;
    private String approvedAtDate;

    // ──────────────────────────────────────────────────────────────────────
    // Helper Getters to ensure null-safety in Thymeleaf / SpEL
    // ──────────────────────────────────────────────────────────────────────

    public String getPreparedAtDate() {
        if (preparedAtDate != null && !preparedAtDate.isBlank()) return preparedAtDate;
        if (preparedAt != null && !preparedAt.isBlank()) return preparedAt;
        return null;
    }

    public String getApprovedAtDate() {
        if (approvedAtDate != null && !approvedAtDate.isBlank()) return approvedAtDate;
        if (approvedAt != null && !approvedAt.isBlank()) return approvedAt;
        return null;
    }

    public String getRevisionCapa() {
        return (revisionCapa != null && !revisionCapa.isBlank()) ? revisionCapa : "10";
    }

    public String getRevisionFicha() {
        return (revisionFicha != null && !revisionFicha.isBlank()) ? revisionFicha : "5";
    }

    /** @deprecated use getRevisionCapa() / getRevisionFicha() */
    public String getRevision() {
        // fallback: if caller still sends the old 'revision' field, honor it
        return (revision != null && !revision.isBlank()) ? revision : null;
    }

    public Boolean getSimplesNacional() {
        return Boolean.TRUE.equals(simplesNacional);
    }

    public Boolean getIpiSuspension() {
        if (Boolean.TRUE.equals(ipiSuspension)) return true;
        return Boolean.TRUE.equals(ipiExemption);
    }

    public Boolean getIpiExemption() {
        if (Boolean.TRUE.equals(ipiExemption)) return true;
        return Boolean.TRUE.equals(ipiSuspension);
    }

    public Boolean getSuframaDiscount() {
        return Boolean.TRUE.equals(suframaDiscount);
    }

    public Boolean getCdiIncentive() {
        return Boolean.TRUE.equals(cdiIncentive);
    }

    public Boolean getRequiresPurchaseOrder() {
        return Boolean.TRUE.equals(requiresPurchaseOrder);
    }

    public Boolean getHasFichaCadastral() {
        return hasFichaCadastral != null ? hasFichaCadastral : true;
    }

    public Boolean getHasBuscaCep() {
        return Boolean.TRUE.equals(hasBuscaCep);
    }

    public Boolean getHasSerasa() {
        return Boolean.TRUE.equals(hasSerasa);
    }

    public Boolean getHasComprovanteCnpj() {
        return Boolean.TRUE.equals(hasComprovanteCnpj);
    }

    public Boolean getHasContratoSocial() {
        if (Boolean.TRUE.equals(hasContratoSocial)) return true;
        if (documentFileNames != null) {
            return documentFileNames.stream().anyMatch(name -> name.toLowerCase().contains("contrato"));
        }
        return false;
    }

    public Boolean getHasUltimaAlteracao() {
        return Boolean.TRUE.equals(hasUltimaAlteracao);
    }

    public Boolean getHasComprovanteEstadual() {
        return Boolean.TRUE.equals(hasComprovanteEstadual);
    }

    public Boolean getHasDeclaracaoIpi() {
        if (Boolean.TRUE.equals(hasDeclaracaoIpi)) return true;
        return getIpiSuspension();
    }

    public Boolean getHasComprovanteSuframa() {
        if (Boolean.TRUE.equals(hasComprovanteSuframa)) return true;
        return getSuframaDiscount();
    }

    // ──────────────────────────────────────────────────────────────────────
    // Inner DTO
    // ──────────────────────────────────────────────────────────────────────

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
