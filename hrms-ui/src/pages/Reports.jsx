import { useEffect, useState } from "react";
import "../assets/css/style.css";

import {
  getEmployeeReport,
  getAttendanceReport,
  getPayrollReport,
  getLeaveReport
} from "../services/reportService";

function Reports(){

  const [employees,setEmployees] = useState([]);
  const [attendance,setAttendance] = useState([]);
  const [payroll,setPayroll] = useState([]);
  const [leaves,setLeaves] = useState([]);

  const [activeReport,setActiveReport] = useState("employees");

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);


  useEffect(()=>{

    loadReports();

  },[activeReport]);


  const loadReports = async () => {

    setLoading(true);

    try{

      if(activeReport === "employees"){

        const data = await getEmployeeReport();
        setEmployees(data);

      }

      if(activeReport === "attendance"){

        const data = await getAttendanceReport();
        setAttendance(data);

      }

      if(activeReport === "payroll"){

        const data = await getPayrollReport();
        setPayroll(data);

      }

      if(activeReport === "leaves"){

        const data = await getLeaveReport();
        setLeaves(data);

      }

    }catch(err){

      setError("Failed to load report");

    }

    setLoading(false);

  };


  const exportCSV = (data) => {

    const csvRows = [];

    const headers = Object.keys(data[0] || {});
    csvRows.push(headers.join(","));

    for(const row of data){

      const values = headers.map(header => row[header]);

      csvRows.push(values.join(","));

    }

    const csvString = csvRows.join("\n");

    const blob = new Blob([csvString], {type:"text/csv"});

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "report.csv";

    a.click();

  };


  return(

    <div className="page-container">

      <h1 className="page-title">Reports & Analytics</h1>


      {/* Report selector */}

      <div className="report-tabs">

        <button onClick={()=>setActiveReport("employees")}>
          Employees
        </button>

        <button onClick={()=>setActiveReport("attendance")}>
          Attendance
        </button>

        <button onClick={()=>setActiveReport("payroll")}>
          Payroll
        </button>

        <button onClick={()=>setActiveReport("leaves")}>
          Leaves
        </button>

      </div>


      {loading && <p>Loading report...</p>}

      {error && <p className="error">{error}</p>}


      {/* Export */}

      <button
        className="export-btn"
        onClick={()=>exportCSV(
          activeReport === "employees" ? employees :
          activeReport === "attendance" ? attendance :
          activeReport === "payroll" ? payroll :
          leaves
        )}
      >
        Export CSV
      </button>


      {/* Report Table */}

      <div className="table-container">

        <table className="data-table">

          <thead>

            <tr>

              {Object.keys(
                activeReport === "employees" ? employees[0] || {} :
                activeReport === "attendance" ? attendance[0] || {} :
                activeReport === "payroll" ? payroll[0] || {} :
                leaves[0] || {}
              ).map((key)=>(
                <th key={key}>{key}</th>
              ))}

            </tr>

          </thead>


          <tbody>

            {(activeReport === "employees" ? employees :
             activeReport === "attendance" ? attendance :
             activeReport === "payroll" ? payroll :
             leaves
            ).map((row,index)=>(
              <tr key={index}>

                {Object.values(row).map((value,i)=>(
                  <td key={i}>{value}</td>
                ))}

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}

export default Reports;