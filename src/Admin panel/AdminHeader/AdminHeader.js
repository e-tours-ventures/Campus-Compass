import React, { useState } from "react";
import "./AdminHeader.css";
import logo from "../../Home/assets/images/logo.png";

function AdminHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="navbar-container">
        <div className="logo">
          <img src={logo} alt="Campus Compass Logo" className="logo-image" />
          <span className="logo-text">Campus Compass</span>
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