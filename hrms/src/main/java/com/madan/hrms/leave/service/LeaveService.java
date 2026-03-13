package com.madan.hrms.leave.service;

import com.madan.hrms.leave.dto.LeaveDTO;
import com.madan.hrms.leave.entity.LeaveRequest;
import com.madan.hrms.leave.repository.LeaveRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeaveService {

    private final LeaveRepository leaveRepository;

    public LeaveService(LeaveRepository leaveRepository){
        this.leaveRepository = leaveRepository;
    }

    public List<LeaveDTO> getAllLeaves(){

        return leaveRepository.findAll()
                .stream()
                .map(l -> new LeaveDTO(
                        l.getId(),
                        l.getEmployeeName(),
                        l.getLeaveType(),
                        l.getStartDate(),
                        l.getEndDate(),
                        l.getStatus()))
                .collect(Collectors.toList());
    }

    public LeaveDTO createLeave(LeaveDTO dto){

        LeaveRequest leave = new LeaveRequest();
        leave.setEmployeeName(dto.getEmployeeName());
        leave.setLeaveType(dto.getLeaveType());
        leave.setStartDate(dto.getStartDate());
        leave.setEndDate(dto.getEndDate());
        leave.setStatus(dto.getStatus());

        LeaveRequest saved = leaveRepository.save(leave);

        return new LeaveDTO(
                saved.getId(),
                saved.getEmployeeName(),
                saved.getLeaveType(),
                saved.getStartDate(),
                saved.getEndDate(),
                saved.getStatus());
    }

    public void deleteLeave(Long id){
        leaveRepository.deleteById(id);
    }
}