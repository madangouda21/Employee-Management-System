import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import "../../assets/css/style.css";

function Layout(){

  return(

    <div className="layout-container">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Section */}

      <div className="main-content">

        {/* Top Navbar */}

        <Navbar />

        {/* Page Content */}

        <div className="page-content">

          <Outlet />

        </div>

      </div>

    </div>

  );

}

export default Layout;