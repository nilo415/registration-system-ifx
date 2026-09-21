package com.inflex.registration_system.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.inflex.registration_system.dto.RegistrationPayloadDTO;
import com.inflex.registration_system.entity.RegistrationEntity;
import com.inflex.registration_system.repository.RegistrationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.Map;
import java.util.Optional;

/**
 * Persistence service that stores registrations in the SQLite database.
 *
 * <p>Business rules:
 * <ul>
 *   <li>A single "active" row per CNPJ exists in the table — save is an upsert.</li>
 *   <li>When the status is {@code FINALIZED}, a PDF is generated and stored on disk.</li>
 *   <li>The full payload DTO is serialised as JSON and stored in the {@code payload_json} LOB.</li>
 * </ul>
 * </p>
 */
@Service
public class RegistrationService {

    private static final Logger log = LoggerFactory.getLogger(RegistrationService.class);

    private final RegistrationRepository repository;
    private final PdfGeneratorService pdfGeneratorService;
    private final ObjectMapper objectMapper;
    private final Path storageDir;

    public RegistrationService(
            RegistrationRepository repository,
            PdfGeneratorService pdfGeneratorService,
            ObjectMapper objectMapper,
            @Value("${app.storage.directory:./local_data}") String storagePath) {
        this.repository     = repository;
        this.pdfGeneratorService = pdfGeneratorService;
        this.objectMapper   = objectMapper;
        this.storageDir     = Paths.get(storagePath).toAbsolutePath().normalize();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Public API
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Upserts the registration payload into the database.
     * If a row with the same CNPJ already exists it is updated; otherwise a new row is inserted.
     * If the status is {@code FINALIZED} a PDF is also generated on disk.
     *
     * @param payload the DTO received from the frontend
     * @throws JsonProcessingException if the payload cannot be serialised to JSON
     */
    @Transactional
    public void saveRegistration(RegistrationPayloadDTO payload) throws JsonProcessingException {
        sanitizePayload(payload);

        // Stamp the server-side save time
        payload.setSavedAt(Instant.now().toString());

        String json = objectMapper.writeValueAsString(payload);

        // Upsert: update existing row for this CNPJ or create a new one
        RegistrationEntity entity = repository
                .findTopByCnpjOrderByUpdatedAtDesc(payload.getCnpj())
                .orElse(new RegistrationEntity());

        entity.setCnpj(payload.getCnpj());
        entity.setStatus(payload.getStatus());
        entity.setSavedAt(payload.getSavedAt());
        entity.setPayloadJson(json);

        repository.save(entity);

        log.info("Registration saved to DB → CNPJ: {} | Status: {} | id: {}",
                payload.getCnpj(), payload.getStatus(), entity.getId());

        // Generate PDF when the registration is finalized
        if ("FINALIZED".equalsIgnoreCase(payload.getStatus())) {
            pdfGeneratorService.generateRegistrationPdf(payload, storageDir);
        }
    }

    /**
     * Returns the most recently updated registration across all CNPJs.
     *
     * @return the latest {@link RegistrationPayloadDTO}, or {@code null} if the table is empty
     * @throws JsonProcessingException if the stored JSON cannot be deserialised
     */
    @Transactional(readOnly = true)
    public RegistrationPayloadDTO readCurrentRegistration() throws JsonProcessingException {
        Optional<RegistrationEntity> latest = repository.findTopByOrderByUpdatedAtDesc();

        if (latest.isEmpty()) {
            log.info("No registration found in the database.");
            return null;
        }

        return latest.map(entity -> {
            try {
                RegistrationPayloadDTO dto = objectMapper.readValue(entity.getPayloadJson(), RegistrationPayloadDTO.class);
                log.info("Registration read from DB → CNPJ: {} | Status: {} | id: {}",
                        dto.getCnpj(), dto.getStatus(), entity.getId());
                return dto;
            } catch (JsonProcessingException e) {
                log.error("Failed to deserialise payload_json for record id: {}", entity.getId(), e);
                throw new RuntimeException("Malformed payload JSON in DB", e);
            }
        }).orElse(null);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Sanitization Helpers
    // ─────────────────────────────────────────────────────────────────────────

    private void sanitizePayload(RegistrationPayloadDTO payload) {
        if (payload == null) return;
        payload.setCnpj(digitsOnly(payload.getCnpj()));
        payload.setZipCode(digitsOnly(payload.getZipCode()));
        payload.setFinancialZipCode(digitsOnly(payload.getFinancialZipCode()));
        payload.setDeliveryZipCode(digitsOnly(payload.getDeliveryZipCode()));

        payload.setPhone(digitsOnly(payload.getPhone()));
        payload.setMobilePhone(digitsOnly(payload.getMobilePhone()));
        payload.setFinancialPhone(digitsOnly(payload.getFinancialPhone()));
        payload.setFinancialMobilePhone(digitsOnly(payload.getFinancialMobilePhone()));
        payload.setDeliveryPhone(digitsOnly(payload.getDeliveryPhone()));

        if (payload.getRepresentatives() != null) {
            for (RegistrationPayloadDTO.RepresentativeDTO rep : payload.getRepresentatives()) {
                if (rep != null) {
                    rep.setCpf(digitsOnly(rep.getCpf()));
                    rep.setPhone(digitsOnly(rep.getPhone()));
                }
            }
        }

        if (payload.getBankReferences() != null) {
            for (Map<String, Object> bank : payload.getBankReferences()) {
                if (bank != null) {
                    cleanMapFieldDigits(bank, "cnpj");
                    cleanMapFieldDigits(bank, "fone");
                    cleanMapFieldDigits(bank, "phone");
                    cleanMapFieldDate(bank, "informacoesData");
                }
            }
        }

        if (payload.getCommercialReferences() != null) {
            for (Map<String, Object> ref : payload.getCommercialReferences()) {
                if (ref != null) {
                    cleanMapFieldDigits(ref, "cnpj");
                    cleanMapFieldDigits(ref, "phone");
                    cleanMapFieldDate(ref, "clienteDesde");
                    cleanMapFieldDate(ref, "maiorFaturaData");
                    cleanMapFieldDate(ref, "ultimaFaturaData");
                    cleanMapFieldDate(ref, "informacoesData");
                    cleanMapFieldCurrency(ref, "mediasMensalValor");
                    cleanMapFieldCurrency(ref, "maiorFaturaValor");
                    cleanMapFieldCurrency(ref, "ultimaFaturaValor");
                    cleanMapFieldCurrency(ref, "debitosVencidos");
                    cleanMapFieldCurrency(ref, "debitosVencer");
                    cleanMapFieldCurrency(ref, "limiteCredito");
                }
            }
        }
    }

    private static String digitsOnly(String s) {
        if (s == null) return null;
        return s.replaceAll("\\D", "");
    }

    private static void cleanMapFieldDigits(Map<String, Object> map, String key) {
        Object val = map.get(key);
        if (val != null) {
            map.put(key, digitsOnly(val.toString()));
        }
    }

    private static void cleanMapFieldDate(Map<String, Object> map, String key) {
        Object val = map.get(key);
        if (val != null) {
            String str = val.toString().trim();
            if (str.matches("^\\d{4}-\\d{2}-\\d{2}.*")) {
                String[] parts = str.substring(0, 10).split("-");
                map.put(key, parts[2] + parts[1] + parts[0]);
            } else {
                map.put(key, digitsOnly(str));
            }
        }
    }

    private static void cleanMapFieldCurrency(Map<String, Object> map, String key) {
        Object val = map.get(key);
        if (val != null) {
            String digits = digitsOnly(val.toString());
            if (!digits.isEmpty()) {
                try {
                    map.put(key, Long.toString(Long.parseLong(digits)));
                } catch (Exception ignored) {
                    map.put(key, digits);
                }
            } else {
                map.put(key, "");
            }
        }
    }
}
