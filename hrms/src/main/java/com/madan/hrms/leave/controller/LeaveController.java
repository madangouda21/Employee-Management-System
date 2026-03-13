package com.madan.hrms.leave.controller;

import com.madan.hrms.leave.dto.LeaveDTO;
import com.madan.hrms.leave.service.LeaveService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins="*")
public class LeaveController {

    private final LeaveService leaveService;

    public LeaveController(LeaveService leaveService){
        this.leaveService = leaveService;
    }

    @GetMapping
    public List<LeaveDTO> getLeaves(){
        return leaveService.getAllLeaves();
    }

    @PostMapping
    public LeaveDTO createLeave(@RequestBody LeaveDTO dto){
        return leaveService.createLeave(dto);
    }

    @DeleteMapping("/{id}")
    public void deleteLeave(@PathVariable Long id){
        leaveService.deleteLeave(id);
    }
}