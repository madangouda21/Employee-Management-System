package com.madan.hrms.audit.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;

    private String action;

    private String module;

    private LocalDateTime timestamp;

    public AuditLog() {}

    public AuditLog(String userEmail, String action, String module) {
        this.userEmail = userEmail;
        this.action = action;
        this.module = module;
        this.timestamp = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getAction() {
        return action;
    }

    public String getModule() {
        return module;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public void setModule(String module) {
        this.module = module;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}