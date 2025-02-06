import React, { useState } from "react";
import "./AdminHeader.css";
import logo from "../../Home/assets/images/logo.png";

function AdminHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header-admin">
      <div className="navbar-container">
        <div className="logo2">
          <img src={logo} alt="Campus Compass Logo" className="logo-image2" />
          <span className="logo-text2">Campus Compass</span>
        </div>

        <nav className="nav">
          <ul>
            <li>Home</li>
            <li>Student Info</li>
            <li>Courses</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AdminHeader;