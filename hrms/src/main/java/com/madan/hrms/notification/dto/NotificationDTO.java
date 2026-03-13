package com.madan.hrms.notification.dto;

public class NotificationDTO {

    private Long id;
    private String title;
    private String message;
    private String recipient;
    private String status;

    public NotificationDTO() {}

    public NotificationDTO(Long id, String title, String message,
                           String recipient, String status) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.recipient = recipient;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getMessage() {
        return message;
    }

    public String getRecipient() {
        return recipient;
    }

    public String getStatus() {
        return status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}