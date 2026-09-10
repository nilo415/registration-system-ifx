package com.inflex.registration_system.entity;

import jakarta.persistence.*;
import java.time.Instant;

/**
 * JPA entity that maps to the {@code registrations} table in the SQLite database.
 *
 * <p>The full registration payload is stored as a JSON string in the {@code payload_json}
 * column (LOB). This approach avoids schema migrations every time the DTO evolves and
 * keeps the relational side thin — only queryable fields are promoted to real columns.</p>
 */
@Entity
@Table(name = "registrations")
public class RegistrationEntity {

    /** Auto-incremented surrogate primary key. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * CNPJ of the company being registered.
     * Indexed for fast look-ups by CNPJ.
     */
    @Column(name = "cnpj", nullable = false)
    private String cnpj;

    /**
     * Registration status: {@code DRAFT} or {@code FINALIZED}.
     */
    @Column(name = "status", nullable = false)
    private String status;

    /**
     * Timestamp (ISO-8601) set by the server when the record was last saved.
     */
    @Column(name = "saved_at")
    private String savedAt;

    /**
     * The complete wizard payload serialised as a JSON string.
     * Stored as a LOB so it can grow without schema changes.
     */
    @Lob
    @Column(name = "payload_json", nullable = false)
    private String payloadJson;

    /** Server-side creation timestamp — set once on INSERT. */
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    /** Server-side update timestamp — refreshed on every UPDATE. */
    @Column(name = "updated_at")
    private Instant updatedAt;

    // ─────────────────────────────────────────────────────────────────────────
    // Lifecycle hooks
    // ─────────────────────────────────────────────────────────────────────────

    @PrePersist
    void onPrePersist() {
        createdAt = Instant.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    void onPreUpdate() {
        updatedAt = Instant.now();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Getters & Setters
    // ─────────────────────────────────────────────────────────────────────────

    public Long getId()                { return id; }
    public void setId(Long id)         { this.id = id; }

    public String getCnpj()            { return cnpj; }
    public void setCnpj(String cnpj)   { this.cnpj = cnpj; }

    public String getStatus()              { return status; }
    public void setStatus(String status)   { this.status = status; }

    public String getSavedAt()             { return savedAt; }
    public void setSavedAt(String savedAt) { this.savedAt = savedAt; }

    public String getPayloadJson()                 { return payloadJson; }
    public void setPayloadJson(String payloadJson) { this.payloadJson = payloadJson; }

    public Instant getCreatedAt()              { return createdAt; }
    public Instant getUpdatedAt()              { return updatedAt; }
}
