import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./AdminHeader.css";
import logo from "../../Home/assets/images/logo.png";
import { setActiveLinks } from "../../Home/js/setActiveLinks";

function AdminHeader() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const location = useLocation();

  // Close navigation menu when clicking a link
  const handleNavLinkClick = () => {
    setIsNavVisible(false);
  };

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

        <nav className="nav">
          <ul>
            <li>Home</li>
            <li>Student Info</li>
            <li>Courses</li>
          </ul>
        </nav>

        {/* Hamburger Menu Button */}
        <button 
          className="menu-toggle" 
          onClick={() => setIsNavVisible(!isNavVisible)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
