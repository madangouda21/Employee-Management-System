package com.madan.hrms.department.controller;

import com.madan.hrms.department.dto.DepartmentDTO;
import com.madan.hrms.department.service.DepartmentService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins="*")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService){
        this.departmentService = departmentService;
    }

    @GetMapping
    public List<DepartmentDTO> getDepartments(){
        return departmentService.getAllDepartments();
    }

    @PostMapping
    public DepartmentDTO createDepartment(@RequestBody DepartmentDTO dto){
        return departmentService.createDepartment(dto);
    }

    @DeleteMapping("/{id}")
    public void deleteDepartment(@PathVariable Long id){
        departmentService.deleteDepartment(id);
    }
}