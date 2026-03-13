import { useEffect, useState } from "react";
import "../assets/css/style.css";

import { getEmployees } from "../services/employeeService";
import {
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance
} from "../services/attendanceService";

function Attendance(){

  const [attendance,setAttendance] = useState([]);
  const [employees,setEmployees] = useState([]);

  const [employeeId,setEmployeeId] = useState("");
  const [date,setDate] = useState("");
  const [status,setStatus] = useState("Present");

  const [editingId,setEditingId] = useState(null);

  const [search,setSearch] = useState("");

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);


  useEffect(()=>{

    loadAttendance();
    loadEmployees();

  },[]);


  const loadAttendance = async () => {

    setLoading(true);

    try{

      const data = await getAttendance();

      setAttendance(data);

    }catch(err){

      setError("Failed to load attendance");

    }

    setLoading(false);

  };


  const loadEmployees = async () => {

    try{

      const data = await getEmployees();

      setEmployees(data);

    }catch(err){

      console.error("Employee load failed");

    }

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    const record = {

      employeeId,
      date,
      status

    };

    try{

      if(editingId){

        await updateAttendance(editingId,record);

        setEditingId(null);

      }else{

        await createAttendance(record);

      }

      setEmployeeId("");
      setDate("");
      setStatus("Present");

      loadAttendance();

    }catch(err){

      setError("Operation failed");

    }

  };


  const handleEdit = (record) => {

    setEmployeeId(record.employeeId);
    setDate(record.date);
    setStatus(record.status);

    setEditingId(record.id);

  };


  const handleDelete = async (id) => {

    if(!window.confirm("Delete attendance record?")) return;

    try{

      await deleteAttendance(id);

      loadAttendance();

    }catch(err){

      setError("Delete failed");

    }

  };


  const filteredAttendance = attendance.filter((a)=>

    a.employeeName?.toLowerCase().includes(search.toLowerCase())

  );


  return(

    <div className="page-container">

      <h1 className="page-title">Attendance Management</h1>


      {/* Attendance Form */}

      <form className="form-container" onSubmit={handleSubmit}>

        <select
          value={employeeId}
          onChange={(e)=>setEmployeeId(e.target.value)}
        >

          <option value="">Select Employee</option>

          {employees.map((emp)=>(
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}

        </select>


        <input
          type="date"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
        />


        <select
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
        >

          <option>Present</option>
          <option>Absent</option>
          <option>Leave</option>

        </select>


        <button type="submit">

          {editingId ? "Update Attendance" : "Mark Attendance"}

        </button>

      </form>


      {/* Search */}

      <input
        type="text"
        placeholder="Search employee..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="search-box"
      />


      {loading && <p>Loading attendance...</p>}

      {error && <p className="error">{error}</p>}


      {/* Attendance Table */}

      <div className="table-container">

        <table className="data-table">

          <thead>

            <tr>

              <th>ID</th>
              <th>Employee</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>

            </tr>

          </thead>


          <tbody>

            {filteredAttendance.length === 0 && (

              <tr>
                <td colSpan="5">No attendance records</td>
              </tr>

            )}

            {filteredAttendance.map((a)=>(
              <tr key={a.id}>

                <td>{a.id}</td>

                <td>{a.employeeName}</td>

                <td>{a.date}</td>

                <td>{a.status}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={()=>handleEdit(a)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={()=>handleDelete(a.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}

export default Attendance;