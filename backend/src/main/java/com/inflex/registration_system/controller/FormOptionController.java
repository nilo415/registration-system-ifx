package com.inflex.registration_system.controller;

import com.inflex.registration_system.entity.FormOptionEntity;
import com.inflex.registration_system.service.FormOptionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Tag(name = "Form Options", description = "Endpoints para gerenciamento de opções customizáveis de campos do formulário")
@RestController
@RequestMapping("/api/options")
@RequiredArgsConstructor
public class FormOptionController {

    private final FormOptionService formOptionService;

    @Operation(summary = "Lista opções por categoria")
    @GetMapping("/{category}")
    public ResponseEntity<List<FormOptionEntity>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(formOptionService.listByCategory(category));
    }

    @Operation(summary = "Lista todas as opções cadastradas")
    @GetMapping
    public ResponseEntity<List<FormOptionEntity>> getAll() {
        return ResponseEntity.ok(formOptionService.listAll());
    }

    @Operation(summary = "Adiciona uma nova opção em uma categoria")
    @PostMapping("/{category}")
    public ResponseEntity<?> addOption(@PathVariable String category, @RequestBody Map<String, String> body) {
        String label = body != null ? body.get("label") : null;
        if (label == null || label.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "O campo 'label' é obrigatório."));
        }
        try {
            FormOptionEntity created = formOptionService.addOption(category, label);
            return ResponseEntity.ok(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @Operation(summary = "Deleta uma opção por ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOption(@PathVariable Long id) {
        formOptionService.deleteOption(id);
        return ResponseEntity.noContent().build();
    }
}
