import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation to track the current location
import "./Modal.css";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import axios from "axios";
const SignupModal = ({ onClose, onSwitchToLogin }) => {
  const [name, setName] = useState(""); // New state for name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const location = useLocation(); // Get the current location (URL)

 

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    console.log("Sending request with:", { name, email, password }); // ✅ Debugging Log
  
    try {
      const { data } = await axios.post("http://localhost:3001/api/users/register", {
        name: name.trim(),
        email: email.trim(),
        password,
      });
      
      setSuccess("Account created successfully!");
      setName("");
      setEmail("");
      setPassword("");
      onClose();
      navigate(location.pathname);
    } catch (err) {
      console.error("Error during signup:", err.response?.data); // Log detailed error
      setError(err.response?.data?.message || "An error occurred while creating your account");
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
          {success && <p className="success-message">{success}</p>}
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Bind name field
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
