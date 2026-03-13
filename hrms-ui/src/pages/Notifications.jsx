import { useEffect, useState } from "react";
import "../assets/css/style.css";

import { getEmployees } from "../services/employeeService";

import {
  getNotifications,
  createNotification,
  deleteNotification
} from "../services/notificationService";

function Notifications(){

  const [notifications,setNotifications] = useState([]);
  const [employees,setEmployees] = useState([]);

  const [employeeId,setEmployeeId] = useState("");
  const [title,setTitle] = useState("");
  const [message,setMessage] = useState("");

  const [search,setSearch] = useState("");

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);


  useEffect(()=>{

    loadNotifications();
    loadEmployees();

  },[]);


  const loadNotifications = async () => {

    setLoading(true);

    try{

      const data = await getNotifications();

      setNotifications(data);

    }catch(err){

      setError("Failed to load notifications");

    }

    setLoading(false);

  };


  const loadEmployees = async () => {

    try{

      const data = await getEmployees();

      setEmployees(data);

    }catch(err){

      console.error("Employee loading failed");

    }

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    const notification = {

      employeeId,
      title,
      message

    };

    try{

      await createNotification(notification);

      setEmployeeId("");
      setTitle("");
      setMessage("");

      loadNotifications();

    }catch(err){

      setError("Notification sending failed");

    }

  };


  const handleDelete = async (id) => {

    if(!window.confirm("Delete this notification?")) return;

    try{

      await deleteNotification(id);

      loadNotifications();

    }catch(err){

      setError("Delete failed");

    }

  };


  const filteredNotifications = notifications.filter((n)=>

    n.title?.toLowerCase().includes(search.toLowerCase())

  );


  return(

    <div className="page-container">

      <h1 className="page-title">Notifications</h1>


      {/* Notification Form */}

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
          type="text"
          placeholder="Notification Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />


        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        />


        <button type="submit">

          Send Notification

        </button>

      </form>


      {/* Search */}

      <input
        type="text"
        placeholder="Search notification..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="search-box"
      />


      {loading && <p>Loading notifications...</p>}

      {error && <p className="error">{error}</p>}


      {/* Notifications Table */}

      <div className="table-container">

        <table className="data-table">

          <thead>

            <tr>

              <th>ID</th>
              <th>Employee</th>
              <th>Title</th>
              <th>Message</th>
              <th>Actions</th>

            </tr>

          </thead>


          <tbody>

            {filteredNotifications.length === 0 && (

              <tr>
                <td colSpan="5">No notifications found</td>
              </tr>

            )}

            {filteredNotifications.map((n)=>(
              <tr key={n.id}>

                <td>{n.id}</td>

                <td>{n.employeeName}</td>

                <td>{n.title}</td>

                <td>{n.message}</td>

                <td>

                  <button
                    className="delete-btn"
                    onClick={()=>handleDelete(n.id)}
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

export default Notifications;