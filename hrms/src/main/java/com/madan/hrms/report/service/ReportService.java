package com.madan.hrms.report.service;

import com.madan.hrms.report.dto.ReportDTO;
import com.madan.hrms.report.entity.Report;
import com.madan.hrms.report.repository.ReportRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportService {

    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository){
        this.reportRepository = reportRepository;
    }

    public List<ReportDTO> getAllReports(){

        return reportRepository.findAll()
                .stream()
                .map(r -> new ReportDTO(
                        r.getId(),
                        r.getReportName(),
                        r.getReportType(),
                        r.getGeneratedDate(),
                        r.getGeneratedBy()))
                .collect(Collectors.toList());
    }

    public ReportDTO createReport(ReportDTO dto){

        Report report = new Report();

        report.setReportName(dto.getReportName());
        report.setReportType(dto.getReportType());
        report.setGeneratedDate(dto.getGeneratedDate());
        report.setGeneratedBy(dto.getGeneratedBy());

        Report saved = reportRepository.save(report);

        return new ReportDTO(
                saved.getId(),
                saved.getReportName(),
                saved.getReportType(),
                saved.getGeneratedDate(),
                saved.getGeneratedBy());
    }

    public void deleteReport(Long id){
        reportRepository.deleteById(id);
    }
}