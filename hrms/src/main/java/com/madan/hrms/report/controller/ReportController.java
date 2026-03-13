package com.madan.hrms.report.controller;

import com.madan.hrms.report.dto.ReportDTO;
import com.madan.hrms.report.service.ReportService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins="*")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService){
        this.reportService = reportService;
    }

    @GetMapping
    public List<ReportDTO> getReports(){
        return reportService.getAllReports();
    }

    @PostMapping
    public ReportDTO createReport(@RequestBody ReportDTO dto){
        return reportService.createReport(dto);
    }

    @DeleteMapping("/{id}")
    public void deleteReport(@PathVariable Long id){
        reportService.deleteReport(id);
    }
}