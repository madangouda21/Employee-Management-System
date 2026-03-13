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

    /* ==============================
       Get All Employees
    ============================== */

    public List<EmployeeResponse> getAllEmployees(){

        List<Employee> employees = employeeRepository.findAll();

        return employees.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /* ==============================
       Create Employee
    ============================== */

    public EmployeeResponse createEmployee(EmployeeRequest request){

        Employee employee = new Employee();

        employee.setName(request.getName());
        employee.setEmail(request.getEmail());
        employee.setDepartment(request.getDepartment());

        Employee savedEmployee = employeeRepository.save(employee);

        return mapToResponse(savedEmployee);
    }

    /* ==============================
       Update Employee
    ============================== */

    public EmployeeResponse updateEmployee(Long id, EmployeeRequest request){

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Employee not found with id: " + id)
                );

        employee.setName(request.getName());
        employee.setEmail(request.getEmail());
        employee.setDepartment(request.getDepartment());

        Employee updatedEmployee = employeeRepository.save(employee);

        return mapToResponse(updatedEmployee);
    }

    /* ==============================
       Delete Employee
    ============================== */

    public void deleteEmployee(Long id){

        if(!employeeRepository.existsById(id)){
            throw new IllegalArgumentException("Employee not found with id: " + id);
        }

        employeeRepository.deleteById(id);
    }

    /* ==============================
       Entity → DTO Mapper
    ============================== */

    private EmployeeResponse mapToResponse(Employee employee){

        return new EmployeeResponse(
                employee.getId(),
                employee.getName(),
                employee.getEmail(),
                employee.getDepartment()
        );
    }

}