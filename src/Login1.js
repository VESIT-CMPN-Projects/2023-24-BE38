import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError(""); // Clear any previous error message
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(""); // Clear any previous error message
  };

  const isValidEmail = (value) => {
    // Regular expression for a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic form validation
    if (!name.trim()) {
      setNameError("Please enter your name.");
    } else {
      setNameError(""); // Clear any previous error message
    }

    if (!email.trim()) {
      setEmailError("Please enter your email.");
    } else if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(""); // Clear any previous error message
    }

    if (name.trim() && isValidEmail(email.trim())) {
      navigate("/Home");
    }
  };

  return (
    <>
      <center>
        <form onSubmit={handleSubmit}>
          <h1>LOGIN</h1>
          <div className="form-group-login">
            <label htmlFor="name" className="form-label-login">
              Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
            />
            {nameError && <p style={{ color: "red" }}>{nameError}</p>}
          </div>
          <div className="form-group-login">
            <label htmlFor="email" className="form-label-login">
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          </div>
          <input type="submit" value="Submit" />
        </form>
        <br /> <br />
        <p className="signup-message">
          Don't have an account? <a href="/Signup">Sign up</a>
        </p>
      </center>
    </>
  );
}

export default Login;
