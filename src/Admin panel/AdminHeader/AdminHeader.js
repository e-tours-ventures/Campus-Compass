import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import Swal from "sweetalert2"; 
import "./AdminHeader.css";
import logo from "../../Home/assets/images/logo.png";
import { setActiveLinks } from "../../Home/js/setActiveLinks";

function AdminHeader() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setActiveLinks(".header-admin");
  }, [location]);

  // Logout Function with Navigation to Root State
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("role");
        Swal.fire("Logged Out!", "You have been successfully logged out.", "success").then(() => {
          navigate("/Login", { replace: true }); 
        });
      }
    });
  };

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
            <li onClick={() => setMenuOpen(false)}>Student Info</li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AdminHeader;
