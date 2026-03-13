package com.madan.hrms.department.service;

import com.madan.hrms.department.dto.DepartmentDTO;
import com.madan.hrms.department.entity.Department;
import com.madan.hrms.department.repository.DepartmentRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository){
        this.departmentRepository = departmentRepository;
    }

    public List<DepartmentDTO> getAllDepartments(){

        return departmentRepository.findAll()
                .stream()
                .map(d -> new DepartmentDTO(
                        d.getId(),
                        d.getName(),
                        d.getDescription()))
                .collect(Collectors.toList());
    }

    public DepartmentDTO createDepartment(DepartmentDTO dto){

        Department department = new Department();
        department.setName(dto.getName());
        department.setDescription(dto.getDescription());

        Department saved = departmentRepository.save(department);

        return new DepartmentDTO(
                saved.getId(),
                saved.getName(),
                saved.getDescription());
    }

    public void deleteDepartment(Long id){
        departmentRepository.deleteById(id);
    }
}