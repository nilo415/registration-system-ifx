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

		// Simula referências comerciais com dados completos para o relatório comercial
		List<Map<String, Object>> commRefs = new ArrayList<>();
		Map<String, Object> ref1 = new LinkedHashMap<>();
		ref1.put("empresa", "Indústria e Comércio de Embalagens e Papéis Especiais do Brasil S.A.");
		ref1.put("nomeFantasia", "Embalagens Brasil");
		ref1.put("cnpj", "12.345.678/0001-99");
		ref1.put("contato", "Mariana Vasconcelos");
		ref1.put("fone", "(11) 98765-4321");
		ref1.put("clienteDesde", "15/03/2018");
		ref1.put("maiorFaturaData", "10/05/2024");
		ref1.put("maiorFaturaValor", "45.000,00");
		ref1.put("ultimaFaturaData", "28/08/2024");
		ref1.put("ultimaFaturaValor", "18.500,00");
		ref1.put("mediasMensalValor", "22.000,00");
		ref1.put("condicaoPagamento", "aprazo");
		ref1.put("diasPrazo", "30");
		ref1.put("formaPagamento", Map.of("boleto", true, "deposito", false, "cheque", false));
		ref1.put("pagamentoPontual", true);
		ref1.put("pagamentoAtraso", false);
		ref1.put("pagamentoCartorio", "nao");
		ref1.put("debitosVencidos", "0,00");
		ref1.put("limiteCredito", "50.000,00");
		ref1.put("conceito", "otimo");
		ref1.put("produtoFornecido", "Bobinas e caixas térmicas");
		ref1.put("observacoes", "Cliente com histórico exemplar de pagamentos pontuais e ótima relação comercial.");
		ref1.put("informacoesData", "16/09/2026");
		commRefs.add(ref1);

		Map<String, Object> ref2 = new LinkedHashMap<>();
		ref2.put("empresa", "FORNECEDOR BETA");
		ref2.put("cnpj", "98.765.432/0001-11");
		ref2.put("contato", "João Silva");
		ref2.put("fone", "(19) 3333-4444");
		ref2.put("produtoFornecido", "Paletes de madeira tratada");
		ref2.put("condicaoPagamento", "avista");
		ref2.put("conceito", "bom");
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
		bank1.put("relato", "Cliente de primeira linha, pontual em suas obrigações financeiras. Sem ocorrências restritivas.");
		bankRefs.add(bank1);

		Map<String, Object> bank2 = new LinkedHashMap<>();
		bank2.put("banco", "Itaú Unibanco S.A.");
		bank2.put("agencia", "0099");
		bank2.put("contaCorrente", "12345-6");
		bank2.put("gerencia", "Mariana Costa");
		bank2.put("fone", "(67) 3422-0000");
		bank2.put("relato", "Conta ativa há mais de 10 anos com movimentações condizentes com o porte da empresa.");
		bankRefs.add(bank2);

		dto.setBankReferences(bankRefs);

		pdfGeneratorService.generateRegistrationPdf(dto, Paths.get("local_data"));
	}

}
