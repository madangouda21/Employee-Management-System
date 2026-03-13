package com.madan.hrms.audit.controller;

import com.madan.hrms.audit.dto.AuditResponse;
import com.madan.hrms.audit.service.AuditService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit")
@CrossOrigin(origins="*")
public class AuditController {

    private final AuditService auditService;

    public AuditController(AuditService auditService){
        this.auditService = auditService;
    }

    @GetMapping
    public List<AuditResponse> getAllAuditLogs(){
        return auditService.getAllLogs();
    }

    @GetMapping("/{id}")
    public AuditResponse getAuditById(@PathVariable Long id){
        return auditService.getAuditById(id);
    }

    @GetMapping("/user/{email}")
    public List<AuditResponse> getAuditByUser(@PathVariable String email){
        return auditService.getAuditByUser(email);
    }

    @GetMapping("/module/{module}")
    public List<AuditResponse> getAuditByModule(@PathVariable String module){
        return auditService.getAuditByModule(module);
    }

    @GetMapping("/today")
    public List<AuditResponse> getTodayLogs(){
        return auditService.getTodayLogs();
    }
}