import "../../assets/css/style.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {

  const navigate = useNavigate();

  const [adminName,setAdminName] = useState("");
  const [adminEmail,setAdminEmail] = useState("");

  useEffect(()=>{

    const email = localStorage.getItem("userEmail") || "admin@hrms.com";

    const name = localStorage.getItem("userName") || "Admin";

    setAdminEmail(email);
    setAdminName(name);

  },[]);


  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");

    navigate("/");

  };


  return (

    <div className="navbar">

      <div className="nav-left">

        <h3>Admin Dashboard</h3>

      </div>


      <div className="nav-right">

        <div className="admin-profile">

          <span className="admin-name">
            {adminName}
          </span>

          <small className="admin-email">
            {adminEmail}
          </small>

        </div>

        <button
          className="logout-x"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default Navbar;