package com.madan.hrms.payroll.controller;

import com.madan.hrms.payroll.entity.Payroll;
import com.madan.hrms.payroll.service.PayrollService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payroll")
@CrossOrigin(origins = "*")
public class PayrollController {

    private final PayrollService payrollService;

    public PayrollController(PayrollService payrollService){
        this.payrollService = payrollService;
    }

    @GetMapping
    public List<Payroll> getPayroll(){
        return payrollService.getAllPayroll();
    }

    @PostMapping
    public Payroll createPayroll(@RequestBody Payroll payroll){
        return payrollService.createPayroll(payroll);
    }

    @PutMapping("/{id}")
    public Payroll updatePayroll(@PathVariable Long id, @RequestBody Payroll payroll){
        return payrollService.updatePayroll(id, payroll);
    }

    @DeleteMapping("/{id}")
    public void deletePayroll(@PathVariable Long id){
        payrollService.deletePayroll(id);
    }

}