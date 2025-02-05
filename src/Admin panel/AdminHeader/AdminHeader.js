import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Admin panel/AdminHeader.css";
import logo from "../assets/images/logo.png";



function AdminHeader() {

  const navRef = useRef(null);


  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Campus Compass Logo" className="logo-image" />
          <span className="logo-text">Campus Compass</span>
        </div>

        {/* <div className="hamburger-menu" onClick={toggleNav}>
          &#9776;
        </div> */}

        {/* <nav ref={navRef} className={`nav-links ${isNavVisible ? "show-nav" : ""}`}>
          <ul>
            <li><Link to="/" className="header-link" onClick={handleNavLinkClick}>Home</Link></li>
            <li><Link to="/UniversitiesAndDegrees/Universitypage" className="header-link" onClick={handleNavLinkClick}>Courses</Link></li>
          </ul>
        </nav> */}

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
