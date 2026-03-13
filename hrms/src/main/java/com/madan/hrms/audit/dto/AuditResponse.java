package com.madan.hrms.audit.dto;

import java.time.LocalDateTime;

public class AuditResponse {

    private Long id;
    private String userEmail;
    private String action;
    private String module;
    private LocalDateTime timestamp;

    public AuditResponse(Long id, String userEmail, String action, String module, LocalDateTime timestamp) {
        this.id = id;
        this.userEmail = userEmail;
        this.action = action;
        this.module = module;
        this.timestamp = timestamp;
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
}