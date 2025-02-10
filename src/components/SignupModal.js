import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const SignupModal = ({ onClose, onSwitchToLogin }) => {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); 

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Sending request with:", { name, email, password });

    try {
      const { data } = await axios.post("http://localhost:3001/api/users/register", {
        name: name.trim(),
        email: email.trim(),
        password,
        role: "student",
      });

      // Save user details in localStorage (Auto Login)
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", name.trim());
      localStorage.setItem("email", email.trim());

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Your account has been created successfully!",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        navigate("/UniversitiesAndDegrees/Universitypage"); 
        onClose();
      }, 2000);
      
    } catch (err) {
      console.error("Signup Error:", err.response?.data);

      // Show an error SweetAlert
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: err.response?.data?.message || "An error occurred while creating your account. Please try again.",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Create Account</h2>

        <button className="btn social google">
          <FaGoogle style={{ marginRight: "10px" }} /> Sign in with Google
        </button>
        <button className="btn social facebook">
          <FaFacebookF style={{ marginRight: "10px" }} /> Sign in with Facebook
        </button>
        <p className="popupptext2">or</p>
        <hr />

        <form onSubmit={handleSignup}>
          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
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
          <button type="submit" className="btn primary">
            Create Account
          </button>
        </form>

        <p>
          <span className="popupptext1">Already a member?</span>{" "}
          <a href="#" onClick={onSwitchToLogin}>
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupModal;
