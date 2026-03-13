package com.madan.hrms.employee.controller;

import com.madan.hrms.employee.dto.EmployeeRequest;
import com.madan.hrms.employee.dto.EmployeeResponse;
import com.madan.hrms.employee.service.EmployeeService;
import com.madan.hrms.common.response.ApiResponse;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService){
        this.employeeService = employeeService;
    }

    /* ==============================
       Get All Employees
    ============================== */

    @GetMapping
    public ApiResponse<List<EmployeeResponse>> getAllEmployees(){

        List<EmployeeResponse> employees = employeeService.getAllEmployees();

        return new ApiResponse<>(
                true,
                "Employees fetched successfully",
                employees
        );
    }

    /* ==============================
       Create Employee
    ============================== */

    @PostMapping
    public ApiResponse<EmployeeResponse> createEmployee(
            @Valid @RequestBody EmployeeRequest request){

        EmployeeResponse employee = employeeService.createEmployee(request);

        return new ApiResponse<>(
                true,
                "Employee created successfully",
                employee
        );
    }

    /* ==============================
       Update Employee
    ============================== */

    @PutMapping("/{id}")
    public ApiResponse<EmployeeResponse> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeRequest request){

        EmployeeResponse employee = employeeService.updateEmployee(id, request);

        return new ApiResponse<>(
                true,
                "Employee updated successfully",
                employee
        );
    }

    /* ==============================
       Delete Employee
    ============================== */

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteEmployee(@PathVariable Long id){

        employeeService.deleteEmployee(id);

        return new ApiResponse<>(
                true,
                "Employee deleted successfully",
                null
        );
    }

}