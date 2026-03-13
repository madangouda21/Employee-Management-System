package com.madan.hrms.payroll.service;

import com.madan.hrms.payroll.entity.Payroll;
import com.madan.hrms.payroll.repository.PayrollRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PayrollService {

    private final PayrollRepository payrollRepository;

    public PayrollService(PayrollRepository payrollRepository){
        this.payrollRepository = payrollRepository;
    }

    public List<Payroll> getAllPayroll(){
        return payrollRepository.findAll();
    }

    public Payroll createPayroll(Payroll payroll){

        double netSalary = payroll.getBasicSalary() + payroll.getBonus() - payroll.getDeductions();
        payroll.setNetSalary(netSalary);

        return payrollRepository.save(payroll);
    }

    public Payroll updatePayroll(Long id, Payroll payroll){

        Payroll existing = payrollRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payroll not found"));

        existing.setEmployeeName(payroll.getEmployeeName());
        existing.setMonth(payroll.getMonth());
        existing.setBasicSalary(payroll.getBasicSalary());
        existing.setBonus(payroll.getBonus());
        existing.setDeductions(payroll.getDeductions());

        double netSalary = payroll.getBasicSalary() + payroll.getBonus() - payroll.getDeductions();
        existing.setNetSalary(netSalary);

        return payrollRepository.save(existing);
    }

    public void deletePayroll(Long id){
        payrollRepository.deleteById(id);
    }

}