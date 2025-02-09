import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./AdminHeader.css";
import logo from "../../Home/assets/images/logo.png";
import { setActiveLinks } from "../../Home/js/setActiveLinks";

function AdminHeader() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setActiveLinks(".header-admin");
  }, [location]);

  return (
    <header className="header-admin">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="logo2">
          <img src={logo} alt="Campus Compass Logo" className="logo-image2" />
          <span className="logo-text2">Campus Compass</span>
        </div>

        {/* Hamburger Menu Button */}
        <button 
          className="menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Navigation Links */}
        <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
          <ul>
            <li onClick={() => setMenuOpen(false)}>Home</li>
            <li onClick={() => setMenuOpen(false)}>Student Info</li>
            <li onClick={() => setMenuOpen(false)}>Courses</li>
            <li onClick={() => setMenuOpen(false)}>Logout</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AdminHeader;
