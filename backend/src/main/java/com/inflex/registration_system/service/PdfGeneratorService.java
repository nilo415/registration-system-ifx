package com.inflex.registration_system.service;

import com.inflex.registration_system.dto.RegistrationPayloadDTO;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.io.FileOutputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.Locale;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class PdfGeneratorService {

    private final SpringTemplateEngine templateEngine;

    public void generateRegistrationPdf(RegistrationPayloadDTO payload, Path targetDirectory) {
        log.info("Generating PDF for CNPJ: {}", payload.getCnpj());

        try {
            if (!Files.exists(targetDirectory)) {
                Files.createDirectories(targetDirectory);
            }

            byte[] pdfBytes = generatePdfBytes(payload);
            Path pdfPath = targetDirectory.resolve("ficha_cadastral.pdf");
            Files.write(pdfPath, pdfBytes);

            log.info("PDF successfully generated at: {}", pdfPath);

        } catch (Exception e) {
            log.error("Failed to generate PDF for CNPJ: {}", payload.getCnpj(), e);
            throw new RuntimeException("Error generating PDF: " + e.getMessage(), e);
        }
    }

    public byte[] generatePdfBytes(RegistrationPayloadDTO payload) {
        try {
            enrichPayloadForPdf(payload);

            Context context = new Context();
            context.setVariable("payload", payload);

            String htmlContent = templateEngine.process("registration_form", context);
            htmlContent = embedLogoIfAvailable(htmlContent);

            try (java.io.ByteArrayOutputStream baos = new java.io.ByteArrayOutputStream()) {
                PdfRendererBuilder builder = new PdfRendererBuilder();
                builder.useFastMode();
                builder.withHtmlContent(htmlContent, null);
                builder.toStream(baos);
                builder.run();
                return baos.toByteArray();
            }
        } catch (Exception e) {
            log.error("Failed to generate PDF bytes for CNPJ: {}", payload.getCnpj(), e);
            throw new RuntimeException("Error generating PDF bytes: " + e.getMessage(), e);
        }
    }

    private void enrichPayloadForPdf(RegistrationPayloadDTO payload) {
        if (payload.getPreparedAt() == null || payload.getPreparedAt().isBlank()) {
            payload.setPreparedAt(LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        }

        // Mapear propriedades bancárias vindas em português do formulário
        if (payload.getBankReferences() != null) {
            for (Map<String, Object> bank : payload.getBankReferences()) {
                if (!bank.containsKey("bankName") && bank.containsKey("banco")) {
                    bank.put("bankName", bank.get("banco"));
                }
                if (!bank.containsKey("banco") && bank.containsKey("bankName")) {
                    bank.put("banco", bank.get("bankName"));
                }
                if (!bank.containsKey("agency") && bank.containsKey("agencia")) {
                    bank.put("agency", bank.get("agencia"));
                }
                if (!bank.containsKey("agencia") && bank.containsKey("agency")) {
                    bank.put("agencia", bank.get("agency"));
                }
                if (!bank.containsKey("accountNumber")) {
                    Object acc = bank.containsKey("contaCorrente") ? bank.get("contaCorrente") : bank.get("account");
                    if (acc != null) bank.put("accountNumber", acc);
                }
                if (!bank.containsKey("contaCorrente")) {
                    Object acc = bank.containsKey("accountNumber") ? bank.get("accountNumber") : bank.get("account");
                    if (acc != null) bank.put("contaCorrente", acc);
                }
                if (!bank.containsKey("contactName")) {
                    Object contact = bank.containsKey("gerencia") ? bank.get("gerencia") : bank.get("contact");
                    if (contact != null) bank.put("contactName", contact);
                }
                if (!bank.containsKey("gerencia")) {
                    Object contact = bank.containsKey("contactName") ? bank.get("contactName") : bank.get("contact");
                    if (contact != null) bank.put("gerencia", contact);
                }
                if (!bank.containsKey("phone") && bank.containsKey("fone")) {
                    bank.put("phone", bank.get("fone"));
                }
                if (!bank.containsKey("fone") && bank.containsKey("phone")) {
                    bank.put("fone", bank.get("phone"));
                }
                if (!bank.containsKey("observation") && bank.containsKey("relato")) {
                    bank.put("observation", bank.get("relato"));
                }
                if (!bank.containsKey("relato") && bank.containsKey("observation")) {
                    bank.put("relato", bank.get("observation"));
                }
                // Fallbacks para empresa, nomeFantasia, cnpj e informacoesData
                if (!bank.containsKey("empresa") || bank.get("empresa") == null || bank.get("empresa").toString().isBlank()) {
                    bank.put("empresa", payload.getCompanyName() != null ? payload.getCompanyName() : "");
                }
                if (!bank.containsKey("nomeFantasia") || bank.get("nomeFantasia") == null || bank.get("nomeFantasia").toString().isBlank()) {
                    bank.put("nomeFantasia", payload.getTradeName() != null ? payload.getTradeName() : "");
                }
                if (!bank.containsKey("cnpj") || bank.get("cnpj") == null || bank.get("cnpj").toString().isBlank()) {
                    bank.put("cnpj", payload.getCnpj() != null ? payload.getCnpj() : "");
                }
                if (!bank.containsKey("informacoesData") || bank.get("informacoesData") == null || bank.get("informacoesData").toString().isBlank()) {
                    bank.put("informacoesData", payload.getPreparedAtDate() != null ? payload.getPreparedAtDate() : LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
                }
                if (!bank.containsKey("dataExtenso") || bank.get("dataExtenso") == null) {
                    bank.put("dataExtenso", "Dourados-MS, " + LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
                }
            }
        }

        // Mapear propriedades comerciais vindas do formulário
        if (payload.getCommercialReferences() != null) {
            String defaultDataExtenso = "Dourados-MS, " + LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));

            for (Map<String, Object> ref : payload.getCommercialReferences()) {
                if (!ref.containsKey("companyName") && ref.containsKey("empresa")) {
                    ref.put("companyName", ref.get("empresa"));
                }
                ref.put("supplierCompanyName", ref.get("empresa") != null ? ref.get("empresa") : ref.get("companyName"));
                if (!ref.containsKey("contactName")) {
                    Object contact = ref.containsKey("contato") ? ref.get("contato") : ref.get("nomeContato");
                    ref.put("contactName", contact != null ? contact : "");
                }
                if (!ref.containsKey("produtoFornecido")) {
                    ref.put("produtoFornecido", "");
                }
                if (!ref.containsKey("phone")) {
                    Object phone = ref.containsKey("fone") ? ref.get("fone") : ref.get("telefone");
                    ref.put("phone", phone != null ? phone : "");
                }
                if (!ref.containsKey("clientSince") && ref.containsKey("clienteDesde")) {
                    ref.put("clientSince", ref.get("clienteDesde"));
                }
                if (!ref.containsKey("highestInvoice") && ref.containsKey("maiorFaturaValor")) {
                    ref.put("highestInvoice", ref.get("maiorFaturaValor"));
                }
                if (!ref.containsKey("monthlyAverage") && ref.containsKey("mediasMensalValor")) {
                    ref.put("monthlyAverage", ref.get("mediasMensalValor"));
                }
                if (!ref.containsKey("debitosVencidos") || ref.get("debitosVencidos") == null || ref.get("debitosVencidos").toString().isBlank()) {
                    ref.put("debitosVencidos", "0,00");
                }
                if (!ref.containsKey("debitosVencer") || ref.get("debitosVencer") == null || ref.get("debitosVencer").toString().isBlank()) {
                    ref.put("debitosVencer", "0,00");
                }
                if (!ref.containsKey("paymentBehavior")) {
                    if (Boolean.TRUE.equals(ref.get("pagamentoPontual"))) {
                        ref.put("paymentBehavior", "Pontual");
                    } else if (Boolean.TRUE.equals(ref.get("pagamentoAtraso"))) {
                        ref.put("paymentBehavior", "Com atraso");
                    } else if (ref.containsKey("condicaoPagamento")) {
                        ref.put("paymentBehavior", ref.get("condicaoPagamento"));
                    } else {
                        ref.put("paymentBehavior", "");
                    }
                }

                // Dados do cliente para o cabeçalho/identificação da folha comercial
                ref.put("clientCompanyName", payload.getCompanyName() != null ? payload.getCompanyName() : "");
                ref.put("clientTradeName", payload.getTradeName() != null ? payload.getTradeName() : "");
                ref.put("clientCnpj", payload.getCnpj() != null ? payload.getCnpj() : "");

                // Data de registro por extenso
                if (!ref.containsKey("dataExtenso") || ref.get("dataExtenso") == null) {
                    ref.put("dataExtenso", defaultDataExtenso);
                }

                // Data de coleta
                if (!ref.containsKey("informacoesData") || ref.get("informacoesData") == null || ref.get("informacoesData").toString().isBlank()) {
                    ref.put("informacoesData", payload.getPreparedAtDate() != null ? payload.getPreparedAtDate() : LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
                }

                // Responsável pelas informações (contato ou fornecedor)
                Object resp = ref.get("contato");
                if (resp == null || resp.toString().isBlank()) {
                    resp = ref.get("contactName");
                }
                if (resp == null || resp.toString().isBlank()) {
                    resp = ref.get("empresa");
                }
                ref.put("responsavelInfo", resp != null ? resp.toString() : "Responsável");
            }
        }
    }

    private String embedLogoIfAvailable(String htmlContent) {
        Path[] possiblePaths = new Path[] {
            Paths.get("frontend", "src", "assets", "images", "inflex-logo.png").toAbsolutePath().normalize(),
            Paths.get("..", "frontend", "src", "assets", "images", "inflex-logo.png").toAbsolutePath().normalize(),
            Paths.get("src", "main", "resources", "static", "inflex-logo.png").toAbsolutePath().normalize()
        };

        for (Path logoPath : possiblePaths) {
            if (Files.exists(logoPath)) {
                try {
                    byte[] bytes = Files.readAllBytes(logoPath);
                    String base64Logo = "data:image/png;base64," + Base64.getEncoder().encodeToString(bytes);
                    htmlContent = htmlContent.replace("..\\..\\..\\..\\..\\frontend\\src\\assets\\images\\inflex-logo.png", base64Logo);
                    htmlContent = htmlContent.replace("../../../../../frontend/src/assets/images/inflex-logo.png", base64Logo);
                    htmlContent = htmlContent.replace("logo.png", base64Logo);
                    break;
                } catch (Exception e) {
                    log.warn("Could not read logo image to encode as base64: {}", logoPath, e);
                }
            }
        }

        return htmlContent;
    }
}
