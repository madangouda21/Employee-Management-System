import { useState, useEffect } from "react";
import "../assets/css/style.css";

import {
  getEmployeeReport,
  getAttendanceReport,
  getPayrollReport,
  getLeaveReport
} from "../services/reportService";

function Reports(){

  const [reportType,setReportType] = useState("employees");
  const [data,setData] = useState([]);
  const [error,setError] = useState(null);

  useEffect(()=>{
    loadReport("employees");
  },[]);

  const loadReport = async(type)=>{

    setError(null);

    try{

      let result = [];

      if(type === "employees"){
        result = await getEmployeeReport();
      }

      if(type === "attendance"){
        result = await getAttendanceReport();
      }

      if(type === "payroll"){
        result = await getPayrollReport();
      }

      if(type === "leaves"){
        result = await getLeaveReport();
      }

      setData(result);

    }catch(err){

      setError("Failed to load report");

    }

  };

  const changeReport = (type)=>{
    setReportType(type);
    loadReport(type);
  };

  return(

    <div className="page-container">

      <h1 className="page-title">Reports & Analytics</h1>

      <div className="form-container">

        <button onClick={()=>changeReport("employees")}>
          Employees
        </button>

        <button onClick={()=>changeReport("attendance")}>
          Attendance
        </button>

        <button onClick={()=>changeReport("payroll")}>
          Payroll
        </button>

        <button onClick={()=>changeReport("leaves")}>
          Leaves
        </button>

      </div>

      {error && <p className="error">{error}</p>}

      <div className="table-container">

        <table className="data-table">

          <thead>

            <tr>

              {reportType === "employees" && (
                <>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                </>
              )}

              {reportType === "attendance" && (
                <>
                  <th>ID</th>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Status</th>
                </>
              )}

              {reportType === "payroll" && (
                <>
                  <th>ID</th>
                  <th>Employee</th>
                  <th>Salary</th>
                  <th>Net Pay</th>
                </>
              )}

              {reportType === "leaves" && (
                <>
                  <th>ID</th>
                  <th>Employee</th>
                  <th>Start Date</th>
                  <th>Status</th>
                </>
              )}

            </tr>

          </thead>

          <tbody>

            {data.length === 0 ? (

              <tr>
                <td colSpan="5">No data available</td>
              </tr>

            ) : (

              data.map((item)=>(
                <tr key={item.id}>

                  {Object.values(item).map((val,index)=>(
                    <td key={index}>{val}</td>
                  ))}

                </tr>
              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  )

}

export default Reports;