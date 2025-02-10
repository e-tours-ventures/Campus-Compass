import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // User icon
import { setActiveLinks } from "./setActiveLinks";
import Swal from "sweetalert2"; // Import SweetAlert
import "../css/Header.css";
import logo from "../assets/images/logo.png";
import LoginModal from "../../components/LoginModal";
import SignupModal from "../../components/SignupModal";

function Header() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navRef = useRef(null);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate(); 

  // Get user details from localStorage
  const userName = localStorage.getItem("name");
  const userEmail = localStorage.getItem("email");
  const userRole = localStorage.getItem("role");

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const handleNavLinkClick = () => {
    setIsNavVisible(false);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setActiveLinks(".header-link", ".footer-link");
  }, [location]);

  // Functions to open/close modals
  const openLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const openSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const closeModal = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  // Logout Function
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("email");

        // Redirect to home
        navigate("/");

        // Show logout success message
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have been successfully logged out.",
          showConfirmButton: false,
          timer: 2000,
        });

        setShowUserMenu(false); 
      }
    });
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Campus Compass Logo" className="logo-image" />
          <span className="logo-text">Campus Compass</span>
        </div>

        <div className="hamburger-menu" onClick={toggleNav}>
          &#9776;
        </div>

        <nav ref={navRef} className={`nav-links ${isNavVisible ? "show-nav" : ""}`}>
          <ul>
            <li><Link to="/" className="header-link" onClick={handleNavLinkClick}>Home</Link></li>
            <li><Link to="/About" className="header-link" onClick={handleNavLinkClick}>About</Link></li>
            <li><Link to="/UniversitiesAndDegrees/Universitypage" className="header-link" onClick={handleNavLinkClick}>Courses</Link></li>
            <li><Link to="/FAQ" className="header-link" onClick={handleNavLinkClick}>FAQ</Link></li>
            <li><Link to="/Contact" className="header-link" onClick={handleNavLinkClick}>Contact Us</Link></li>
          </ul>
        </nav>

        {/* Show Login & Signup if NOT logged in */}
        {!userName ? (
          <div className="auth-buttons">
            <button className="login-btn" onClick={openLogin}>Login</button>
            <button className="signup-btn" onClick={openSignup}>Sign Up</button>
          </div>
        ) : (
          // Show user icon when logged in
          <div className="user-icon-container" ref={userMenuRef}>
            <FaUserCircle className="user-icon" onClick={() => setShowUserMenu(!showUserMenu)} />
            
            {/* Small dropdown modal for user details */}
            {showUserMenu && (
              <div className="user-menu">
                <p><strong>{userName}</strong></p>
                <p>{userEmail}</p>
                <p className="user-role">{userRole === "admin" ? "Admin" : "Student"}</p>
                <hr />
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}

        {/* Modals */}
        {showLogin && <LoginModal onClose={closeModal} onSwitchToSignup={openSignup} />}
        {showSignup && <SignupModal onClose={closeModal} onSwitchToLogin={openLogin} />}
      </div>
    </header>
  );
}

export default Header;
