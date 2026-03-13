package com.madan.hrms.audit.service;

import com.madan.hrms.audit.dto.AuditResponse;
import com.madan.hrms.audit.entity.AuditLog;
import com.madan.hrms.audit.repository.AuditRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuditService {

    private final AuditRepository auditRepository;

    public AuditService(AuditRepository auditRepository){
        this.auditRepository = auditRepository;
    }

    public List<AuditResponse> getAllLogs(){

        return auditRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public AuditResponse getAuditById(Long id){

        AuditLog log = auditRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Audit log not found"));

        return mapToResponse(log);
    }

    public List<AuditResponse> getAuditByUser(String email){

        return auditRepository.findAll()
                .stream()
                .filter(a -> a.getUserEmail().equalsIgnoreCase(email))
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<AuditResponse> getAuditByModule(String module){

        return auditRepository.findAll()
                .stream()
                .filter(a -> a.getModule().equalsIgnoreCase(module))
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<AuditResponse> getTodayLogs(){

        LocalDate today = LocalDate.now();

        return auditRepository.findAll()
                .stream()
                .filter(a -> a.getTimestamp().toLocalDate().equals(today))
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private AuditResponse mapToResponse(AuditLog log){

        return new AuditResponse(
                log.getId(),
                log.getUserEmail(),
                log.getAction(),
                log.getModule(),
                log.getTimestamp()
        );
    }
}