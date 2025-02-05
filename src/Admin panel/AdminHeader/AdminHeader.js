import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./AdminHeader.css";
import logo from "../../Home/assets/images/logo.png";



function AdminHeader() {

  const navRef = useRef(null);


  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Campus Compass Logo" className="logo-image" />
          <span className="logo-text">Campus Compass</span>
        </div>

        <div className="hamburger-menu">
          &#9776;
        </div>

        <nav className="nav-links">
          <ul>
            <li>Home</li>
            <li>Courses</li>
          </ul>
        </nav>

        {/* Login & Signup Buttons 
        <div className="auth-buttons">
          <button className="login-btn" onClick={openLogin}>Login</button>
          <button className="signup-btn" onClick={openSignup}>Sign Up</button>
        </div>*/}

       
      </div>
    </header>
  );
}

export default AdminHeader;
