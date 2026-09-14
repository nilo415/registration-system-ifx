package com.inflex.registration_system;

import com.inflex.registration_system.dto.RegistrationPayloadDTO;
import com.inflex.registration_system.service.PdfGeneratorService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@SpringBootTest
class RegistrationSystemApplicationTests {

	@Autowired
	private PdfGeneratorService pdfGeneratorService;

	@Test
	void testGeneratePdfWithPartialReferences() {
		RegistrationPayloadDTO dto = new RegistrationPayloadDTO();
		dto.setCompanyName("EMPRESA TESTE LTDA");
		dto.setCnpj("00.000.000/0000-16");
		dto.setSuframaDiscount(true);
		dto.setSuframaNumber("20.1234.56-7");
		dto.setSimplesNacional(true);
		dto.setIpiSuspension(false);
		dto.setRequiresPurchaseOrder(true);

		// Simula referências comerciais com nomes longos e quebras
		List<Map<String, Object>> commRefs = new ArrayList<>();
		Map<String, Object> ref1 = new LinkedHashMap<>();
		ref1.put("empresa", "Indústria e Comércio de Embalagens e Papéis Especiais do Brasil S.A.");
		ref1.put("cnpj", "12.345.678/0001-99");
		ref1.put("contato", "Mariana Vasconcelos");
		ref1.put("fone", "(11) 98765-4321");
		ref1.put("produtoFornecido", "Bobinas e caixas térmicas");
		commRefs.add(ref1);

		Map<String, Object> ref2 = new LinkedHashMap<>();
		ref2.put("empresa", "FORNECEDOR BETA");
		ref2.put("cnpj", "98.765.432/0001-11");
		ref2.put("contato", "João Silva");
		ref2.put("fone", "(19) 3333-4444");
		ref2.put("produtoFornecido", "Paletes de madeira tratada");
		commRefs.add(ref2);

		dto.setCommercialReferences(commRefs);

		// Simula referências bancárias (sem relato)
		List<Map<String, Object>> bankRefs = new ArrayList<>();
		Map<String, Object> bank1 = new LinkedHashMap<>();
		bank1.put("banco", "Banco do Brasil");
		bank1.put("agencia", "1234-5");
		bank1.put("contaCorrente", "56789-0");
		bank1.put("gerencia", "Fabio Assunção");
		bank1.put("fone", "(11) 3210-9876");
		bankRefs.add(bank1);

		dto.setBankReferences(bankRefs);

		pdfGeneratorService.generateRegistrationPdf(dto, Paths.get("local_data"));
	}

}
