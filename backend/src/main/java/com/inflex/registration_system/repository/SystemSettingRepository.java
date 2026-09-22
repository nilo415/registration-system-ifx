package com.inflex.registration_system.repository;

import com.inflex.registration_system.entity.SystemSettingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SystemSettingRepository extends JpaRepository<SystemSettingEntity, String> {
}
