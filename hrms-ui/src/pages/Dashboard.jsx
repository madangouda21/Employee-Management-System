import "../assets/css/style.css";
import { useEffect, useState } from "react";

import StatCard from "../components/cards/StatCard";
import EmployeeChart from "../components/charts/EmployeeChart";
import RecentActivity from "../components/dashboard/RecentActivity";

import { getEmployees } from "../services/employeeService";

function Dashboard(){

  const [employees,setEmployees] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);

  useEffect(()=>{

    const fetchEmployees = async () => {

      try{

        const data = await getEmployees();

        setEmployees(data || []);

      }catch(err){

        console.error("Dashboard fetch error:",err);
        setError("Failed to load employee data");

      }

      setLoading(false);

    };

    fetchEmployees();

  },[]);


  if(loading){
    return <div className="page-container">Loading dashboard...</div>;
  }

  if(error){
    return <div className="page-container">{error}</div>;
  }


  return(

    <div className="page-container">

      <h1 className="page-title">Dashboard</h1>

      <div className="dashboard-cards">

        <StatCard
          title="Total Employees"
          value={employees.length}
        />

        <StatCard
          title="Departments"
          value={
            [...new Set(employees.map(e => e.department))].length
          }
        />

        <StatCard
          title="Active Users"
          value={employees.length}
        />

      </div>


      <div className="dashboard-grid">

        <EmployeeChart employees={employees}/>

        <RecentActivity employees={employees}/>

      </div>

    </div>

  )

}

export default Dashboard;