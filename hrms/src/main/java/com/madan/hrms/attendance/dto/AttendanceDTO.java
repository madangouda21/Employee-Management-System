package com.madan.hrms.attendance.dto;

import lombok.Data;

import java.time.LocalTime;
import java.time.LocalDate;

@Data
public class AttendanceDTO{
    private Long employeeId;
    private LocalDate date;
    private LocalTime checkIn;
    private LocalTime checkOut;
    private String status;
}