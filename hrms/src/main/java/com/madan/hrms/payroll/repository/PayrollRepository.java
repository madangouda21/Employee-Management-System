package com.madan.hrms.payroll.repository;

import com.madan.hrms.payroll.entity.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PayrollRepository extends JpaRepository<Payroll, Long> {
}