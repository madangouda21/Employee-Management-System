import API from "./api";

/* Employee report */

export const getEmployeeReport = async () => {

  try{

    const response = await API.get("/reports/employees");

    return response.data;

  }catch(error){

    console.error("Employee report error", error);
    throw error;

  }

};


/* Attendance report */

export const getAttendanceReport = async () => {

  try{

    const response = await API.get("/reports/attendance");

    return response.data;

  }catch(error){

    console.error("Attendance report error", error);
    throw error;

  }

};


/* Payroll report */

export const getPayrollReport = async () => {

  try{

    const response = await API.get("/reports/payroll");

    return response.data;

  }catch(error){

    console.error("Payroll report error", error);
    throw error;

  }

};


/* Leave report */

export const getLeaveReport = async () => {

  try{

    const response = await API.get("/reports/leaves");

    return response.data;

  }catch(error){

    console.error("Leave report error", error);
    throw error;

  }

};