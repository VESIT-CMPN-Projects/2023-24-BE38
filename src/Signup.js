import React, { useState } from "react";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import db from "./Firebaseconfig.js";

function Sign() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [mail, setMail] = useState("");
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [mailError, setMailError] = useState("");
  const [ans, setAns] = useState("");
  const navigate = useNavigate();


  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError(""); // Clear the previous error message
  };

  const handleAgeChange = (event) => {
    const newAge = event.target.value;
    setAge(newAge);
    setAgeError(newAge < 0 ? "Please enter a valid positive integer" : "");
  };

  const handleEmailChange = (event) => {
    setMail(event.target.value);
    setMailError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check for empty fields and update error messages
    if (!name) {
      setNameError("Name is required.");
    }
    if (!age || age < 0) {
      setAgeError("Age is required and cannot be negative.");
    }
    if (!mail) {
      setMailError("Email is required.");
    }

    // If any field is empty, stop the submission and display error messages
    if (!name || !age || age < 0 || !mail) {
      setAns("Please fill in all the required fields.");
      return;
    }

    // If all fields are filled, proceed with form submission
    let data = { name, age, mail };
    let n = name + "--" + new Date().toString();
    let r = ref(db, "student/" + n);
    set(r, data);
    navigate("/login1");
  };

  return (
    <>
      <center>
        <form onSubmit={handleSubmit} className="signup-form">
          <h1>SIGN UP</h1>
          <div className="form-group-signup">
            <label htmlFor="name" className="form-label-signup">
              Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={handleNameChange}
              required
            />
            {nameError && <p className="error-message" style={{ color: "red" }}>{nameError}</p>}
          </div>
          <br />
          <br />
          <div className="form-group-signup">
            <label htmlFor="age" className="form-label-signup">
              Age <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="number"
              placeholder="Enter your age"
              onChange={handleAgeChange}
              required
              min="0"
            />
            {ageError && <p className="error-message" style={{ color: "red" }}>{ageError}</p>}
          </div>
          <br />
          <br />
          <div className="form-group-signup">
            <label htmlFor="email" className="form-label-signup">
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={handleEmailChange}
              required
            />
            {mailError && <p className="error-message" style={{ color: "red" }}>{mailError}</p>}
          </div>
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
        <h1>{ans}</h1>
      </center>
    </>
  );
}

export default Sign;
