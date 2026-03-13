import "../../assets/css/style.css";
import { useState } from "react";

function EmployeeTable({ employees }) {

  const [search,setSearch] = useState("");

  const filteredEmployees = employees
    ? employees.filter((emp)=>
        emp.name?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return(

    <div className="table-container">

      <div className="table-header">

        <h3>Employees</h3>

        <input
          type="text"
          placeholder="Search employee..."
          className="search-box"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

      </div>

      <table className="data-table">

        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
          </tr>

        </thead>

        <tbody>

          {filteredEmployees.length > 0 ? (

            filteredEmployees.map((employee)=>(
              <tr key={employee.id}>

                <td>{employee.id}</td>

                <td>{employee.name}</td>

                <td>{employee.department || "N/A"}</td>

                <td>{employee.email}</td>

              </tr>
            ))

          ) : (

            <tr>
              <td colSpan="4" style={{textAlign:"center"}}>
                No Employees Found
              </td>
            </tr>

          )}

        </tbody>

      </table>

    </div>

  )

}

export default EmployeeTable;