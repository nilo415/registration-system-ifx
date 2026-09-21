package com.inflex.registration_system.service;

import com.inflex.registration_system.entity.FormOptionEntity;
import com.inflex.registration_system.repository.FormOptionRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class FormOptionService {

    private final FormOptionRepository repository;

    public static String normalizeCategory(String category) {
        if (category == null) return "";
        String cat = category.trim().toLowerCase();
        return switch (cat) {
            case "clienttype", "tipocliente", "tipo_cliente" -> "tipoCliente";
            case "clientgroup", "grupocliente", "grupo_cliente" -> "grupoCliente";
            case "salesrepresentative", "representante", "representante_vendas" -> "representante";
            case "preparedby", "informacoesobtidaspor", "informacoes_obtidas_por" -> "informacoesObtidasPor";
            case "segmentomercado", "segmento_mercado", "businessactivity", "segmento" -> "segmentoMercado";
            default -> category.trim();
        };
    }

    public List<FormOptionEntity> listByCategory(String category) {
        String norm = normalizeCategory(category);
        return repository.findByCategoryOrderByIdAsc(norm);
    }

    public List<FormOptionEntity> listAll() {
        return repository.findAll();
    }

    @Transactional
    public FormOptionEntity addOption(String category, String label) {
        String norm = normalizeCategory(category);
        String trimmedLabel = label != null ? label.trim() : "";
        if (trimmedLabel.isEmpty()) {
            throw new IllegalArgumentException("O nome da opção não pode ser vazio.");
        }
        if (repository.existsByCategoryAndLabelIgnoreCase(norm, trimmedLabel)) {
            throw new IllegalArgumentException("Esta opção já existe na categoria selecionada.");
        }
        FormOptionEntity entity = new FormOptionEntity(null, norm, trimmedLabel);
        return repository.save(entity);
    }

    @Transactional
    public void deleteOption(Long id) {
        repository.deleteById(id);
    }

    @PostConstruct
    @Transactional
    public void seedDefaults() {
        try {
            // Seed Segmento de Mercado if empty
            if (repository.findByCategoryOrderByIdAsc("segmentoMercado").isEmpty()) {
                List<String> defaultSegmentos = List.of(
                        "000001 FRIGORIFICO SUINOS - (EMBUTIDOS)",
                        "000002 INDUSTRIA DE FARMACEUTICA/SAUDE",
                        "000003 FRIGORIFICO AVES - (FRANGO/PERU)",
                        "000004 INDUSTRIA DE PLASTICOS",
                        "000005 INDUSTRIA DE TEXTIL/VESTIARIO/CONFECÇÃO",
                        "000006 INDUSTRIA MULTI-SETORIAL - CONCRETO",
                        "000007 FRIGORIFICO BOVINOS - (CHARQUE)",
                        "000008 INDUSTRIA NAUTICA E BARCOS"
                );
                for (String val : defaultSegmentos) {
                    repository.save(new FormOptionEntity(null, "segmentoMercado", val));
                }
                log.info("Seeded default options for segmentoMercado");
            }

            // Seed Tipo de Cliente if empty
            if (repository.findByCategoryOrderByIdAsc("tipoCliente").isEmpty()) {
                List<String> defaultTipos = List.of(
                        "Consumidor final",
                        "Produtor Rural",
                        "Revendedor",
                        "Exportação"
                );
                for (String val : defaultTipos) {
                    repository.save(new FormOptionEntity(null, "tipoCliente", val));
                }
                log.info("Seeded default options for tipoCliente");
            }

            // Seed Grupo de Cliente if empty
            if (repository.findByCategoryOrderByIdAsc("grupoCliente").isEmpty()) {
                List<String> defaultGrupos = List.of(
                        "100 – Tributação 12% Fora do Estado",
                        "200 – Tributação 17% Consumidor Final",
                        "300 – Redução na base de Calc. ICMS 58,82% MS",
                        "400 – ICMS diferido 12% p/ CDI MS",
                        "500 – ICMS diferido 0% p/ CDI MS",
                        "600 – ICMS diferido 0% p/ Imp/Exp",
                        "700 – ICMS 17% Importação"
                );
                for (String val : defaultGrupos) {
                    repository.save(new FormOptionEntity(null, "grupoCliente", val));
                }
                log.info("Seeded default options for grupoCliente");
            }
        } catch (Exception e) {
            log.error("Failed to seed default form options", e);
        }
    }
}
