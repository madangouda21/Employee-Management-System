import { useEffect, useState } from "react";
import "../assets/css/style.css";

import { getEmployees } from "../services/employeeService";

import {
  getPayroll,
  createPayroll,
  updatePayroll,
  deletePayroll
} from "../services/payrollService";

function Payroll(){

  const [payroll,setPayroll] = useState([]);
  const [employees,setEmployees] = useState([]);

  const [employeeId,setEmployeeId] = useState("");
  const [salary,setSalary] = useState("");
  const [bonus,setBonus] = useState("");
  const [deduction,setDeduction] = useState("");

  const [editingId,setEditingId] = useState(null);

  const [search,setSearch] = useState("");

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);


  useEffect(()=>{

    loadPayroll();
    loadEmployees();

  },[]);


  const loadPayroll = async () => {

    setLoading(true);

    try{

      const data = await getPayroll();

      setPayroll(data);

    }catch(err){

      setError("Failed to load payroll");

    }

    setLoading(false);

  };


  const loadEmployees = async () => {

    try{

      const data = await getEmployees();

      setEmployees(data);

    }catch(err){

      console.error("Employee load error");

    }

  };


  const calculateNetSalary = () => {

    const basic = Number(salary);
    const b = Number(bonus);
    const d = Number(deduction);

    return basic + b - d;

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    const record = {

      employeeId,
      salary,
      bonus,
      deduction,
      netSalary: calculateNetSalary()

    };

    try{

      if(editingId){

        await updatePayroll(editingId,record);
        setEditingId(null);

      }else{

        await createPayroll(record);

      }

      setEmployeeId("");
      setSalary("");
      setBonus("");
      setDeduction("");

      loadPayroll();

    }catch(err){

      setError("Payroll operation failed");

    }

  };


  const handleEdit = (p) => {

    setEmployeeId(p.employeeId);
    setSalary(p.salary);
    setBonus(p.bonus);
    setDeduction(p.deduction);

    setEditingId(p.id);

  };


  const handleDelete = async (id) => {

    if(!window.confirm("Delete payroll record?")) return;

    try{

      await deletePayroll(id);

      loadPayroll();

    }catch(err){

      setError("Delete failed");

    }

  };


  const filteredPayroll = payroll.filter((p)=>

    p.employeeName?.toLowerCase().includes(search.toLowerCase())

  );


  return(

    <div className="page-container">

      <h1 className="page-title">Payroll Management</h1>


      {/* Payroll Form */}

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
          type="number"
          placeholder="Basic Salary"
          value={salary}
          onChange={(e)=>setSalary(e.target.value)}
        />


        <input
          type="number"
          placeholder="Bonus"
          value={bonus}
          onChange={(e)=>setBonus(e.target.value)}
        />


        <input
          type="number"
          placeholder="Deduction"
          value={deduction}
          onChange={(e)=>setDeduction(e.target.value)}
        />


        <button type="submit">

          {editingId ? "Update Payroll" : "Generate Payroll"}

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


      {loading && <p>Loading payroll...</p>}

      {error && <p className="error">{error}</p>}


      {/* Payroll Table */}

      <div className="table-container">

        <table className="data-table">

          <thead>

            <tr>

              <th>ID</th>
              <th>Employee</th>
              <th>Salary</th>
              <th>Bonus</th>
              <th>Deduction</th>
              <th>Net Salary</th>
              <th>Actions</th>

            </tr>

          </thead>


          <tbody>

            {filteredPayroll.length === 0 && (

              <tr>
                <td colSpan="7">No payroll records</td>
              </tr>

            )}

            {filteredPayroll.map((p)=>(
              <tr key={p.id}>

                <td>{p.id}</td>

                <td>{p.employeeName}</td>

                <td>{p.salary}</td>

                <td>{p.bonus}</td>

                <td>{p.deduction}</td>

                <td>{p.netSalary}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={()=>handleEdit(p)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={()=>handleDelete(p.id)}
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

export default Payroll;