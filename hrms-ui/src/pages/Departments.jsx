import { useState, useEffect } from "react";
import "../assets/css/style.css";

import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from "../services/departmentService";

function Departments(){

  const [departments,setDepartments] = useState([]);
  const [name,setName] = useState("");
  const [editingId,setEditingId] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  useEffect(()=>{

    fetchDepartments();

  },[]);


  const fetchDepartments = async () => {

    setLoading(true);

    try{

      const data = await getDepartments();

      setDepartments(data);

    }catch(err){

      setError("Failed to load departments");

    }

    setLoading(false);

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if(name.trim() === "") return;

    try{

      if(editingId){

        await updateDepartment(editingId,{name});

        setEditingId(null);

      }else{

        await createDepartment({name});

      }

      setName("");

      fetchDepartments();

    }catch(err){

      setError("Operation failed");

    }

  };


  const handleEdit = (dept) => {

    setName(dept.name);
    setEditingId(dept.id);

  };


  const handleDelete = async (id) => {

    if(!window.confirm("Delete this department?")) return;

    try{

      await deleteDepartment(id);

      fetchDepartments();

    }catch(err){

      setError("Delete failed");

    }

  };


  return(

    <div className="page-container">

      <h1 className="page-title">Departments Management</h1>


      <form onSubmit={handleSubmit} className="form-container">

        <input
          type="text"
          placeholder="Department Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <button type="submit">

          {editingId ? "Update Department" : "Add Department"}

        </button>

      </form>


      {loading && <p>Loading departments...</p>}

      {error && <p className="error">{error}</p>}


      <div className="table-container">

        <table className="data-table">

          <thead>

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {departments.length === 0 && (

              <tr>
                <td colSpan="3">No departments found</td>
              </tr>

            )}

            {departments.map((dept)=>(
              <tr key={dept.id}>

                <td>{dept.id}</td>

                <td>{dept.name}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={()=>handleEdit(dept)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={()=>handleDelete(dept.id)}
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

export default Departments;