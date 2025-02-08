import React, { useState } from "react";
import "./Modal.css";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

const LoginModal = ({ onClose, onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


const handleLogin = async (e) => {
  e.preventDefault();
  setError(""); // Reset error state

  try {
    const response = await fetch("http://localhost:3001/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Save token & role in local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role); // Assuming backend returns role

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome ${data.role === "admin" ? "Admin" : "Student"}!`,
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        // Redirect based on role
        if (data.role === "admin") {
          window.location.href = "/admin"; // Redirect admin
        } else {
          window.location.href = "/UniversitiesAndDegrees/Universitypage"; // Redirect student
        }
      }, 2000);

      onClose(); // Close the modal
    } else {
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: data.message || "Invalid credentials!",
      });
    }
  } catch (err) {
    // Show network error alert
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "An error occurred while logging in. Please try again!",
    });
  }
};


  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Log In</h2>
        <form onSubmit={handleLogin}>
          {error && <p className="error-message">{error}</p>}
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <a href="#" className="forgot-password">Forgot Password?</a>
          <button type="submit" className="btn primary">Log In</button>
        </form>

        <p>
          <span className="popupptext1">Not a member yet?</span>{" "}
          <a href="#" onClick={onSwitchToSignup}>Create an Account</a>
        </p>
        <p className="popupptext2">or</p>

        <hr />

        <button className="btn social google">
          <FaGoogle style={{ marginRight: "10px" }} /> Sign in with Google
        </button>
        <button className="btn social facebook">
          <FaFacebookF style={{ marginRight: "10px" }} /> Sign in with Facebook
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
