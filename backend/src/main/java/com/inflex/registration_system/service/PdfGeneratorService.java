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
import java.nio.file.Path;

@Service
@Slf4j
@RequiredArgsConstructor
public class PdfGeneratorService {

    private final SpringTemplateEngine templateEngine;

    public void generateRegistrationPdf(RegistrationPayloadDTO payload, Path targetDirectory) {
        log.info("Generating PDF for CNPJ: {}", payload.getCnpj());
        
        try {
            Context context = new Context();
            context.setVariable("payload", payload);

            String htmlContent = templateEngine.process("registration_form", context);

            Path pdfPath = targetDirectory.resolve("ficha_cadastral.pdf");

            try (OutputStream os = new FileOutputStream(pdfPath.toFile())) {
                PdfRendererBuilder builder = new PdfRendererBuilder();
                builder.useFastMode();
                builder.withHtmlContent(htmlContent, "file:///");
                builder.toStream(os);
                builder.run();
            }

            log.info("PDF successfully generated at: {}", pdfPath);
            
        } catch (Exception e) {
            log.error("Failed to generate PDF for CNPJ: {}", payload.getCnpj(), e);
            throw new RuntimeException("Error generating PDF", e);
        }
    }
}
