import "../../assets/css/style.css";
import { useEffect, useState } from "react";
import { formatDate } from "../../assets/js/utils";
import API from "../../services/api";

function AttendanceTable(){

  const [attendanceData,setAttendanceData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  const loadAttendance = async () => {

    setLoading(true);
    setError(null);

    try{

      const response = await API.get("/attendance");

      if(response && response.data){
        setAttendanceData(response.data);
      }

    }catch(err){

      console.error("Attendance fetch error:",err);
      setError("Failed to load attendance data");

    }

    setLoading(false);

  };

  useEffect(()=>{

    loadAttendance();

  },[]);

  return(

    <div className="table-container">

      <div className="table-header">

        <h3>Attendance Records</h3>

        <button
          className="refresh-btn"
          onClick={loadAttendance}
        >
          Refresh
        </button>

      </div>

      {loading && (
        <p className="loading-text">
          Loading attendance...
        </p>
      )}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {!loading && !error && (

        <table className="data-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {attendanceData.length > 0 ? (

              attendanceData.map((a)=>(
                <tr key={a.id}>

                  <td>{a.id}</td>

                  <td>{a.employeeName}</td>

                  <td>{formatDate(a.date)}</td>

                  <td>{a.checkIn || "-"}</td>

                  <td>{a.checkOut || "-"}</td>

                  <td
                    className={
                      a.status === "Present"
                        ? "status-present"
                        : a.status === "Absent"
                        ? "status-absent"
                        : "status-leave"
                    }
                  >
                    {a.status}
                  </td>

                </tr>
              ))

            ) : (

              <tr>
                <td colSpan="6" style={{textAlign:"center"}}>
                  No attendance records found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      )}

    </div>

  );

}

export default AttendanceTable;