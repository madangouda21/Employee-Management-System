package com.madan.hrms.performance.controller;

import com.madan.hrms.performance.dto.PerformanceDTO;
import com.madan.hrms.performance.service.PerformanceService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/performance")
@CrossOrigin(origins="*")
public class PerformanceController {

    private final PerformanceService performanceService;

    public PerformanceController(PerformanceService performanceService){
        this.performanceService = performanceService;
    }

    @GetMapping
    public List<PerformanceDTO> getPerformanceReviews(){
        return performanceService.getAllReviews();
    }

    @PostMapping
    public PerformanceDTO createReview(@RequestBody PerformanceDTO dto){
        return performanceService.createReview(dto);
    }

    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable Long id){
        performanceService.deleteReview(id);
    }
}