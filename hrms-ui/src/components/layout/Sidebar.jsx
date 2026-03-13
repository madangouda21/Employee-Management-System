import { NavLink } from "react-router-dom";
import "../../assets/css/style.css";

function Sidebar() {

  return (

    <div className="sidebar">

      <h2 className="logo">
        EEMS PRO
      </h2>

      <p className="sidebar-title">
        MAIN NAVIGATION
      </p>


      <ul className="sidebar-menu">

        <li>
          <NavLink to="/dashboard">
            📊 Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/employees">
            👥 Employees
          </NavLink>
        </li>

        <li>
          <NavLink to="/departments">
            🏢 Departments
          </NavLink>
        </li>

        <li>
          <NavLink to="/attendance">
            📅 Attendance
          </NavLink>
        </li>

        <li>
          <NavLink to="/leave">
            ✉️ Leave Management
          </NavLink>
        </li>

        <li>
          <NavLink to="/payroll">
            💰 Payroll
          </NavLink>
        </li>

        <li>
          <NavLink to="/performance">
            ⭐ Performance
          </NavLink>
        </li>

        <li>
          <NavLink to="/notifications">
            🔔 Notifications
          </NavLink>
        </li>

        <li>
          <NavLink to="/reports">
            📑 Reports
          </NavLink>
        </li>

        <li>
          <NavLink to="/audit">
            🛡 Audit Logs
          </NavLink>
        </li>

      </ul>

    </div>

  );

}

export default Sidebar;