package com.madan.hrms.payroll.dto;

import lombok.Data;

@Data
public class PayrollDTO {

    private Long employeeId;

    private String month;

    private Double basicSalary;

    private Double bonus;

    private Double deductions;
}