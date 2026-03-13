package com.madan.hrms.employee.dto;

public class EmployeeResponse {

    private Long id;
    private String name;
    private String email;
    private String department;

    public EmployeeResponse() {}

    public EmployeeResponse(Long id, String name, String email, String department) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.department = department;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getDepartment() {
        return department;
    }
}