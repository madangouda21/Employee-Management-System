import API from "./api";

const REPORT_BASE = "/reports";

/* Employee Report */

export const getEmployeeReport = async () => {

  try{

    const response = await API.get(`${REPORT_BASE}/employees`);

    return response.data;

  }catch(error){

    console.error("Failed to fetch employee report", error);

    throw error;

  }

};


/* Attendance Report */

export const getAttendanceReport = async () => {

  try{

    const response = await API.get(`${REPORT_BASE}/attendance`);

    return response.data;

  }catch(error){

    console.error("Failed to fetch attendance report", error);

    throw error;

  }

};


/* Payroll Report */

export const getPayrollReport = async () => {

  try{

    const response = await API.get(`${REPORT_BASE}/payroll`);

    return response.data;

  }catch(error){

    console.error("Failed to fetch payroll report", error);

    throw error;

  }

};


/* Leave Report */

export const getLeaveReport = async () => {

  try{

    const response = await API.get(`${REPORT_BASE}/leaves`);

    return response.data;

  }catch(error){

    console.error("Failed to fetch leave report", error);

    throw error;

  }

};