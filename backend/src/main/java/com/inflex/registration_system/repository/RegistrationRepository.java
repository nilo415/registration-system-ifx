package com.inflex.registration_system.repository;

import com.inflex.registration_system.entity.RegistrationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data JPA repository for {@link RegistrationEntity}.
 *
 * <p>The business rule is: <em>only one active registration exists at a time</em>.
 * Queries are therefore scoped by CNPJ and ordered by {@code updatedAt} descending
 * so the most recent row is always returned first.</p>
 */
@Repository
public interface RegistrationRepository extends JpaRepository<RegistrationEntity, Long> {

    /**
     * Returns the most recently updated registration for the given CNPJ.
     *
     * @param cnpj the company registration number
     * @return the latest {@link RegistrationEntity}, or empty if none exists
     */
    Optional<RegistrationEntity> findTopByCnpjOrderByUpdatedAtDesc(String cnpj);

    /**
     * Returns the most recently updated registration across all CNPJs.
     * Used by {@code GET /api/registration/current} to restore the wizard state.
     *
     * @return the latest {@link RegistrationEntity}, or empty if the table is empty
     */
    Optional<RegistrationEntity> findTopByOrderByUpdatedAtDesc();
}
