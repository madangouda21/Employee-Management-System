package com.madan.hrms.report.controller;

import com.madan.hrms.employee.entity.Employee;
import com.madan.hrms.employee.repository.EmployeeRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins="*")
public class ReportController {

    private final EmployeeRepository employeeRepository;

    public ReportController(EmployeeRepository employeeRepository){
        this.employeeRepository = employeeRepository;
    }

    @GetMapping("/employees")
    public List<Employee> getEmployeeReport(){
        return employeeRepository.findAll();
    }

    @GetMapping("/attendance")
    public String getAttendanceReport(){
        return "Attendance report endpoint working";
    }

    @GetMapping("/payroll")
    public String getPayrollReport(){
        return "Payroll report endpoint working";
    }

    @GetMapping("/leaves")
    public String getLeaveReport(){
        return "Leave report endpoint working";
    }

}