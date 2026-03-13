import { useEffect, useState } from "react";
import "../assets/css/style.css";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "../services/employeeService";

import { getDepartments } from "../services/departmentService";

function Employees(){

  const [employees,setEmployees] = useState([]);
  const [departments,setDepartments] = useState([]);

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [departmentId,setDepartmentId] = useState("");

  const [editingId,setEditingId] = useState(null);

  const [search,setSearch] = useState("");

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);


  useEffect(()=>{

    loadEmployees();
    loadDepartments();

  },[]);


  const loadEmployees = async () => {

    setLoading(true);

    try{

      const data = await getEmployees();

      setEmployees(data);

    }catch(err){

      setError("Failed to load employees");

    }

    setLoading(false);

  };


  const loadDepartments = async () => {

    try{

      const data = await getDepartments();

      setDepartments(data);

    }catch(err){

      console.error("Department loading failed");

    }

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    const employee = {
      name,
      email,
      departmentId
    };

    try{

      if(editingId){

        await updateEmployee(editingId,employee);

        setEditingId(null);

      }else{

        await createEmployee(employee);

      }

      setName("");
      setEmail("");
      setDepartmentId("");

      loadEmployees();

    }catch(err){

      setError("Operation failed");

    }

  };


  const handleEdit = (emp) => {

    setName(emp.name);
    setEmail(emp.email);
    setDepartmentId(emp.departmentId);

    setEditingId(emp.id);

  };


  const handleDelete = async (id) => {

    if(!window.confirm("Delete employee?")) return;

    try{

      await deleteEmployee(id);

      loadEmployees();

    }catch(err){

      setError("Delete failed");

    }

  };


  const filteredEmployees = employees.filter((emp)=>

    emp.name.toLowerCase().includes(search.toLowerCase())

  );


  return(

    <div className="page-container">

      <h1 className="page-title">Employee Management</h1>


      {/* Employee Form */}

      <form className="form-container" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Employee Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Employee Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />


        <select
          value={departmentId}
          onChange={(e)=>setDepartmentId(e.target.value)}
        >

          <option value="">Select Department</option>

          {departments.map((dept)=>(
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}

        </select>


        <button type="submit">

          {editingId ? "Update Employee" : "Add Employee"}

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


      {loading && <p>Loading employees...</p>}

      {error && <p className="error">{error}</p>}


      {/* Employee Table */}

      <div className="table-container">

        <table className="data-table">

          <thead>

            <tr>

              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>

            </tr>

          </thead>


          <tbody>

            {filteredEmployees.length === 0 && (

              <tr>
                <td colSpan="5">No employees found</td>
              </tr>

            )}

            {filteredEmployees.map((emp)=>(
              <tr key={emp.id}>

                <td>{emp.id}</td>

                <td>{emp.name}</td>

                <td>{emp.email}</td>

                <td>{emp.departmentName}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={()=>handleEdit(emp)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={()=>handleDelete(emp.id)}
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

export default Employees;