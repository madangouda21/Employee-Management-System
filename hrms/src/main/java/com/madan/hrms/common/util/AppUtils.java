package com.madan.hrms.common.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class AppUtils {

    public static String formatDate(LocalDate date){
        return date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    public static double calculateNetSalary(double salary,double bonus,double deduction){
        return salary + bonus - deduction;
    }

}