package com.madan.hrms.report.dto;

public class ReportDTO {

    private Long id;
    private String reportName;
    private String reportType;
    private String generatedDate;
    private String generatedBy;

    public ReportDTO() {}

    public ReportDTO(Long id, String reportName, String reportType,
                     String generatedDate, String generatedBy) {
        this.id = id;
        this.reportName = reportName;
        this.reportType = reportType;
        this.generatedDate = generatedDate;
        this.generatedBy = generatedBy;
    }

    public Long getId() {
        return id;
    }

    public String getReportName() {
        return reportName;
    }

    public String getReportType() {
        return reportType;
    }

    public String getGeneratedDate() {
        return generatedDate;
    }

    public String getGeneratedBy() {
        return generatedBy;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setReportName(String reportName) {
        this.reportName = reportName;
    }

    public void setReportType(String reportType) {
        this.reportType = reportType;
    }

    public void setGeneratedDate(String generatedDate) {
        this.generatedDate = generatedDate;
    }

    public void setGeneratedBy(String generatedBy) {
        this.generatedBy = generatedBy;
    }
}