package com.madan.hrms.performance.dto;

public class PerformanceDTO {

    private Long id;
    private String employeeName;
    private String reviewPeriod;
    private String rating;
    private String comments;

    public PerformanceDTO() {}

    public PerformanceDTO(Long id, String employeeName,
                          String reviewPeriod, String rating,
                          String comments) {
        this.id = id;
        this.employeeName = employeeName;
        this.reviewPeriod = reviewPeriod;
        this.rating = rating;
        this.comments = comments;
    }

    public Long getId() {
        return id;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public String getReviewPeriod() {
        return reviewPeriod;
    }

    public String getRating() {
        return rating;
    }

    public String getComments() {
        return comments;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public void setReviewPeriod(String reviewPeriod) {
        this.reviewPeriod = reviewPeriod;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}