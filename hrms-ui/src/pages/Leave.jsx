import { useEffect, useState } from "react";
import "../assets/css/style.css";

import { getEmployees } from "../services/employeeService";
import {
  getLeaves,
  createLeave,
  updateLeave,
  deleteLeave
} from "../services/leaveService";

function Leave(){

  const [leaves,setLeaves] = useState([]);
  const [employees,setEmployees] = useState([]);

  const [employeeId,setEmployeeId] = useState("");
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate] = useState("");
  const [reason,setReason] = useState("");

  const [status,setStatus] = useState("Pending");

  const [editingId,setEditingId] = useState(null);

  const [search,setSearch] = useState("");

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  useEffect(()=>{

    loadLeaves();
    loadEmployees();

  },[]);


  const loadLeaves = async () => {

    setLoading(true);
    setError(null);

    try{

      const data = await getLeaves();
      setLeaves(data || []);

    }catch(err){

      setError("Failed to load leave requests");

    }

    setLoading(false);

  };


  const loadEmployees = async () => {

    try{

      const data = await getEmployees();
      setEmployees(data || []);

    }catch(err){

      console.error("Employee load error");

    }

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if(!employeeId || !startDate || !endDate){
      setError("All fields are required");
      return;
    }

    if(endDate < startDate){
      setError("End date cannot be before start date");
      return;
    }

    const leave = {
      employeeId,
      startDate,
      endDate,
      reason,
      status
    };

    try{

      if(editingId){

        await updateLeave(editingId,leave);
        setEditingId(null);

      }else{

        await createLeave(leave);

      }

      setEmployeeId("");
      setStartDate("");
      setEndDate("");
      setReason("");
      setStatus("Pending");

      loadLeaves();

    }catch(err){

      setError("Operation failed");

    }

  };


  const handleEdit = (leave) => {

    setEmployeeId(leave.employeeId);
    setStartDate(leave.startDate);
    setEndDate(leave.endDate);
    setReason(leave.reason);
    setStatus(leave.status);

    setEditingId(leave.id);

  };


  const handleDelete = async (id) => {

    if(!window.confirm("Delete leave request?")) return;

    try{

      await deleteLeave(id);
      loadLeaves();

    }catch(err){

      setError("Delete failed");

    }

  };


  const approveLeave = async (leave) => {

    try{

      const updatedLeave = {
        ...leave,
        status: "Approved"
      };

      await updateLeave(leave.id,updatedLeave);
      loadLeaves();

    }catch(err){

      setError("Approve failed");

    }

  };


  const rejectLeave = async (leave) => {

    try{

      const updatedLeave = {
        ...leave,
        status: "Rejected"
      };

      await updateLeave(leave.id,updatedLeave);
      loadLeaves();

    }catch(err){

      setError("Reject failed");

    }

  };


  const filteredLeaves = (leaves || []).filter((l)=>
    l.employeeName?.toLowerCase().includes(search.toLowerCase())
  );


  return(

    <div className="page-container">

      <h1 className="page-title">Leave Management</h1>


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
          value={startDate}
          onChange={(e)=>setStartDate(e.target.value)}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e)=>setEndDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Reason"
          value={reason}
          onChange={(e)=>setReason(e.target.value)}
        />

        <button type="submit">

          {editingId ? "Update Leave" : "Request Leave"}

        </button>

      </form>


      <input
        type="text"
        placeholder="Search employee..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="search-box"
      />


      {loading && <p>Loading leave requests...</p>}
      {error && <p className="error">{error}</p>}


      <div className="table-container">

        <table className="data-table">

          <thead>

            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredLeaves.length === 0 && (

              <tr>
                <td colSpan="6">No leave requests</td>
              </tr>

            )}

            {filteredLeaves.map((leave)=>(
              <tr key={leave.id}>

                <td>{leave.id}</td>
                <td>{leave.employeeName}</td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{leave.status}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={()=>handleEdit(leave)}
                  >
                    Edit
                  </button>

                  <button
                    className="approve-btn"
                    onClick={()=>approveLeave(leave)}
                  >
                    Approve
                  </button>

                  <button
                    className="reject-btn"
                    onClick={()=>rejectLeave(leave)}
                  >
                    Reject
                  </button>

                  <button
                    className="delete-btn"
                    onClick={()=>handleDelete(leave.id)}
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

export default Leave;