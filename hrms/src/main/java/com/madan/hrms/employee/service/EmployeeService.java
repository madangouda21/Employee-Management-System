package com.madan.hrms.employee.service;

import com.madan.hrms.employee.dto.EmployeeRequest;
import com.madan.hrms.employee.dto.EmployeeResponse;
import com.madan.hrms.employee.entity.Employee;
import com.madan.hrms.employee.repository.EmployeeRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository){
        this.employeeRepository = employeeRepository;
    }

    public List<EmployeeResponse> getAllEmployees(){

        return employeeRepository.findAll()
                .stream()
                .map(e -> new EmployeeResponse(
                        e.getId(),
                        e.getName(),
                        e.getEmail(),
                        e.getDepartment()
                ))
                .collect(Collectors.toList());
    }

    public EmployeeResponse createEmployee(EmployeeRequest request){

        Employee employee = new Employee();
        employee.setName(request.getName());
        employee.setEmail(request.getEmail());
        employee.setDepartment(request.getDepartment());

        Employee saved = employeeRepository.save(employee);

        return new EmployeeResponse(
                saved.getId(),
                saved.getName(),
                saved.getEmail(),
                saved.getDepartment()
        );
    }

    public EmployeeResponse updateEmployee(Long id, EmployeeRequest request){

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        employee.setName(request.getName());
        employee.setEmail(request.getEmail());
        employee.setDepartment(request.getDepartment());

        Employee updated = employeeRepository.save(employee);

        return new EmployeeResponse(
                updated.getId(),
                updated.getName(),
                updated.getEmail(),
                updated.getDepartment()
        );
    }

    public void deleteEmployee(Long id){
        employeeRepository.deleteById(id);
    }
}