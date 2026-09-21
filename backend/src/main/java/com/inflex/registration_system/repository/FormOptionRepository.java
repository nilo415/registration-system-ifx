package com.inflex.registration_system.repository;

import com.inflex.registration_system.entity.FormOptionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FormOptionRepository extends JpaRepository<FormOptionEntity, Long> {
    List<FormOptionEntity> findByCategoryOrderByIdAsc(String category);
    boolean existsByCategoryAndLabelIgnoreCase(String category, String label);
}
