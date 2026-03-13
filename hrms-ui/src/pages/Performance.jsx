import { useEffect, useState } from "react";
import "../assets/css/style.css";

import { getEmployees } from "../services/employeeService";

import {
  getPerformance,
  createPerformance,
  updatePerformance,
  deletePerformance
} from "../services/performanceService";

function Performance(){

  const [reviews,setReviews] = useState([]);
  const [employees,setEmployees] = useState([]);

  const [employeeId,setEmployeeId] = useState("");
  const [score,setScore] = useState("");
  const [comment,setComment] = useState("");

  const [editingId,setEditingId] = useState(null);

  const [search,setSearch] = useState("");

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);


  useEffect(()=>{

    loadReviews();
    loadEmployees();

  },[]);


  const loadReviews = async () => {

    setLoading(true);

    try{

      const data = await getPerformance();

      setReviews(data);

    }catch(err){

      setError("Failed to load performance reviews");

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

    const review = {

      employeeId,
      score,
      comment

    };

    try{

      if(editingId){

        await updatePerformance(editingId,review);

        setEditingId(null);

      }else{

        await createPerformance(review);

      }

      setEmployeeId("");
      setScore("");
      setComment("");

      loadReviews();

    }catch(err){

      setError("Operation failed");

    }

  };


  const handleEdit = (review) => {

    setEmployeeId(review.employeeId);
    setScore(review.score);
    setComment(review.comment);

    setEditingId(review.id);

  };


  const handleDelete = async (id) => {

    if(!window.confirm("Delete performance review?")) return;

    try{

      await deletePerformance(id);

      loadReviews();

    }catch(err){

      setError("Delete failed");

    }

  };


  const filteredReviews = reviews.filter((r)=>

    r.employeeName?.toLowerCase().includes(search.toLowerCase())

  );


  return(

    <div className="page-container">

      <h1 className="page-title">Performance Reviews</h1>


      {/* Review Form */}

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
          placeholder="Performance Score (1-10)"
          value={score}
          onChange={(e)=>setScore(e.target.value)}
        />


        <input
          type="text"
          placeholder="Comments"
          value={comment}
          onChange={(e)=>setComment(e.target.value)}
        />


        <button type="submit">

          {editingId ? "Update Review" : "Add Review"}

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


      {loading && <p>Loading reviews...</p>}

      {error && <p className="error">{error}</p>}


      {/* Review Table */}

      <div className="table-container">

        <table className="data-table">

          <thead>

            <tr>

              <th>ID</th>
              <th>Employee</th>
              <th>Score</th>
              <th>Comment</th>
              <th>Actions</th>

            </tr>

          </thead>


          <tbody>

            {filteredReviews.length === 0 && (

              <tr>
                <td colSpan="5">No reviews found</td>
              </tr>

            )}

            {filteredReviews.map((r)=>(
              <tr key={r.id}>

                <td>{r.id}</td>

                <td>{r.employeeName}</td>

                <td>{r.score}</td>

                <td>{r.comment}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={()=>handleEdit(r)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={()=>handleDelete(r.id)}
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

export default Performance;