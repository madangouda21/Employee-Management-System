package com.madan.hrms.performance.service;

import com.madan.hrms.performance.dto.PerformanceDTO;
import com.madan.hrms.performance.entity.Performance;
import com.madan.hrms.performance.repository.PerformanceRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PerformanceService {

    private final PerformanceRepository performanceRepository;

    public PerformanceService(PerformanceRepository performanceRepository){
        this.performanceRepository = performanceRepository;
    }

    public List<PerformanceDTO> getAllReviews(){

        return performanceRepository.findAll()
                .stream()
                .map(p -> new PerformanceDTO(
                        p.getId(),
                        p.getEmployeeName(),
                        p.getReviewPeriod(),
                        p.getRating(),
                        p.getComments()))
                .collect(Collectors.toList());
    }

    public PerformanceDTO createReview(PerformanceDTO dto){

        Performance performance = new Performance();

        performance.setEmployeeName(dto.getEmployeeName());
        performance.setReviewPeriod(dto.getReviewPeriod());
        performance.setRating(dto.getRating());
        performance.setComments(dto.getComments());

        Performance saved = performanceRepository.save(performance);

        return new PerformanceDTO(
                saved.getId(),
                saved.getEmployeeName(),
                saved.getReviewPeriod(),
                saved.getRating(),
                saved.getComments());
    }

    public void deleteReview(Long id){
        performanceRepository.deleteById(id);
    }
}