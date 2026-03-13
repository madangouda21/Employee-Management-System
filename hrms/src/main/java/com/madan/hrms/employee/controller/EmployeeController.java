package com.madan.hrms.employee.controller;

import com.madan.hrms.employee.dto.EmployeeRequest;
import com.madan.hrms.employee.dto.EmployeeResponse;
import com.madan.hrms.employee.service.EmployeeService;

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

    @GetMapping
    public List<EmployeeResponse> getEmployees(){
        return employeeService.getAllEmployees();
    }

    @PostMapping
    public EmployeeResponse createEmployee(@RequestBody EmployeeRequest request){
        return employeeService.createEmployee(request);
    }

    @PutMapping("/{id}")
    public EmployeeResponse updateEmployee(@PathVariable Long id,
                                           @RequestBody EmployeeRequest request){
        return employeeService.updateEmployee(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable Long id){
        employeeService.deleteEmployee(id);
    }
}