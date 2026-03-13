import "../../assets/css/style.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {

  const navigate = useNavigate();

  const [adminName,setAdminName] = useState("Admin");
  const [adminEmail,setAdminEmail] = useState("admin@hrms.com");

  useEffect(()=>{

    const email = localStorage.getItem("userEmail");
    const name = localStorage.getItem("userName");

    if(email){
      setAdminEmail(email);
    }

    if(name){
      setAdminName(name);
    }

  },[]);


  const handleLogout = () => {

    localStorage.clear();

    navigate("/");

    window.location.reload();

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