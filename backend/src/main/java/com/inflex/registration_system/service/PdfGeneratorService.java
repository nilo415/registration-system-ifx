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
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class PdfGeneratorService {

    private final SpringTemplateEngine templateEngine;

    public void generateRegistrationPdf(RegistrationPayloadDTO payload, Path targetDirectory) {
        log.info("Generating PDF for CNPJ: {}", payload.getCnpj());

        try {
            // Normalizar referências e datas antes de passar para o template
            enrichPayloadForPdf(payload);

            Context context = new Context();
            context.setVariable("payload", payload);

            String htmlContent = templateEngine.process("registration_form", context);

            // Embutir logo como Base64 para garantir renderização no OpenHTMLtoPDF independente de caminhos relativos
            htmlContent = embedLogoIfAvailable(htmlContent);

            Path pdfPath = targetDirectory.resolve("ficha_cadastral.pdf");

            try (OutputStream os = new FileOutputStream(pdfPath.toFile())) {
                PdfRendererBuilder builder = new PdfRendererBuilder();
                builder.useFastMode();
                builder.withHtmlContent(htmlContent, targetDirectory.toUri().toString());
                builder.toStream(os);
                builder.run();
            }

            log.info("PDF successfully generated at: {}", pdfPath);

        } catch (Exception e) {
            log.error("Failed to generate PDF for CNPJ: {}", payload.getCnpj(), e);
            throw new RuntimeException("Error generating PDF: " + e.getMessage(), e);
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
                if (!bank.containsKey("agency") && bank.containsKey("agencia")) {
                    bank.put("agency", bank.get("agencia"));
                }
                if (!bank.containsKey("accountNumber")) {
                    Object acc = bank.containsKey("contaCorrente") ? bank.get("contaCorrente") : bank.get("account");
                    if (acc != null) bank.put("accountNumber", acc);
                }
                if (!bank.containsKey("contactName")) {
                    Object contact = bank.containsKey("gerencia") ? bank.get("gerencia") : bank.get("contact");
                    if (contact != null) bank.put("contactName", contact);
                }
                if (!bank.containsKey("phone") && bank.containsKey("fone")) {
                    bank.put("phone", bank.get("fone"));
                }
                if (!bank.containsKey("observation") && bank.containsKey("relato")) {
                    bank.put("observation", bank.get("relato"));
                }
            }
        }

        // Mapear propriedades comerciais vindas do formulário
        if (payload.getCommercialReferences() != null) {
            for (Map<String, Object> ref : payload.getCommercialReferences()) {
                if (!ref.containsKey("companyName") && ref.containsKey("empresa")) {
                    ref.put("companyName", ref.get("empresa"));
                }
                if (!ref.containsKey("contactName")) {
                    Object contact = ref.containsKey("contato") ? ref.get("contato") : ref.get("nomeContato");
                    ref.put("contactName", contact != null ? contact : "");
                }
                if (!ref.containsKey("cnpj")) {
                    ref.put("cnpj", "");
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
