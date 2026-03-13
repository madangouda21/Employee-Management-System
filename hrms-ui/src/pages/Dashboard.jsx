import { useEffect, useState } from "react";
import "../assets/css/style.css";

import StatCard from "../components/cards/StatCard";
import EmployeeChart from "../components/charts/EmployeeChart";
import RecentActivity from "../components/dashboard/RecentActivity";

import { getEmployees } from "../services/employeeService";
import { getDepartments } from "../services/departmentService";

function Dashboard(){

  const [employees,setEmployees] = useState([]);
  const [departments,setDepartments] = useState([]);

  const [activities,setActivities] = useState([]);


  useEffect(()=>{

    loadData();

  },[]);


  const loadData = async () => {

    try{

      const emp = await getEmployees();
      const dep = await getDepartments();

      setEmployees(emp);
      setDepartments(dep);

      setActivities([
        {action:"Employee Added",time:"10 min ago"},
        {action:"Leave Approved",time:"30 min ago"},
        {action:"Payroll Generated",time:"1 hour ago"}
      ]);

    }catch(err){

      console.error("Dashboard loading error");

    }

  };


  const chartData = departments.map((d)=>({

    name: d.name,
    employees: employees.filter(e=>e.departmentId === d.id).length

  }));


  return(

    <div className="page-container">

      <h1 className="page-title">Dashboard</h1>


      {/* Summary Cards */}

      <div className="dashboard-cards">

        <StatCard
          title="Total Employees"
          value={employees.length}
        />

        <StatCard
          title="Departments"
          value={departments.length}
        />

        <StatCard
          title="Attendance Today"
          value="0"
        />

        <StatCard
          title="Pending Leaves"
          value="0"
        />

      </div>


      {/* Charts */}

      <div style={{marginTop:"40px"}}>

        <EmployeeChart data={chartData} />

      </div>


      {/* Activity Feed */}

      <div style={{marginTop:"40px"}}>

        <RecentActivity activities={activities} />

      </div>

    </div>

  )

}

export default Dashboard;