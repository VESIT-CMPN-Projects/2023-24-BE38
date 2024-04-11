import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ref, set } from "firebase/database";
import db from "./Firebaseconfig.js";
import ChatBot from "./ChatBot";

function Home() {
  const [Bmi, setBmi] = useState("");
  const [Age, setAge] = useState("");
  const [Sbp, setSbp] = useState("");
  const [Dbp, setDbp] = useState("");
  const [ans, setAns] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    Bmi: "",
    Age: "",
    Sbp: "",
    Dbp: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const blockSpecialCharacters = (value) => {
    // Remove all special characters using regex
    return value.replace(/[^\d.]/g, '');
  };
  
  const hBmi = (event) => {
    const value = event.target.value;
    const sanitizedValue = blockSpecialCharacters(value);
    setBmi(sanitizedValue);
    setErrorMessages({ ...errorMessages, Bmi: "" });
  };
  
  const hAge = (event) => {
    const value = event.target.value;
    const sanitizedValue = blockSpecialCharacters(value);
    setAge(sanitizedValue);
    setErrorMessages({ ...errorMessages, Age: "" });
  };
  
  const hSbp = (event) => {
    const value = event.target.value;
    const sanitizedValue = blockSpecialCharacters(value);
    setSbp(sanitizedValue);
    setErrorMessages({ ...errorMessages, Sbp: "" });
  };
  
  const hDbp = (event) => {
    const value = event.target.value;
    const sanitizedValue = blockSpecialCharacters(value);
    setDbp(sanitizedValue);
    setErrorMessages({ ...errorMessages, Dbp: "" });
  };
  
  
  const save = (event) => {
    event.preventDefault();

    // Validate input fields
    let valid = true;
    const newErrorMessages = { ...errorMessages };

    if (!Bmi.trim()) {
      newErrorMessages.Bmi = "BMI is required.";
      valid = false;
    }

    if (!Age.trim()) {
      newErrorMessages.Age = "Age is required.";
      valid = false;
    }

    if (!Sbp.trim()) {
      newErrorMessages.Sbp = "Systolic Blood Pressure is required.";
      valid = false;
    }

    if (!Dbp.trim()) {
      newErrorMessages.Dbp = "Diastolic Blood Pressure is required.";
      valid = false;
    }

    setErrorMessages(newErrorMessages);

    if (valid) {
      // If all fields are filled, proceed with saving data
      let data = { Bmi, Age, Sbp, Dbp };
      let n =
        Bmi +
        "--" +
        Age +
        "--" +
        Sbp +
        "--" +
        Dbp +
        "--" +
        new Date().toString();
      let r = ref(db, "Patient/" + n);
      set(r, data);
    }
  };

  useEffect(() => {
    // Check if on the home page and show/hide chatbot accordingly
    const isHomePage = location.pathname === "/Home";
    const chatBotContainer = document.getElementById("chatBotContainer");
    if (chatBotContainer) {
      chatBotContainer.style.display = isHomePage ? "block" : "none";
    }
  }, [location]);

  return (
    <>
      <div className="home-container">
        <center>
          <form onSubmit={save}>
            <div className="form-group-home">
              <label htmlFor="bmi" className="input-label-home">
                BMI <span style={{ color: "red" }}>*</span>
                <span className="calculate-text">
                  Calculate it{" "}
                  <Link
                    to="/BMI"
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    here
                  </Link>
                </span>
              </label>
              <input
                type="text" 
                pattern="\d*" 
                id="bmi"
                placeholder="Enter your BMI"
                onChange={hBmi}
                value={Bmi}
                required
              />
              {errorMessages.Bmi && (
                <p style={{ color: "red" }}>{errorMessages.Bmi}</p>
              )}
            </div>
            <div className="form-group-home">
              <label htmlFor="age" className="input-label-home">
                Age <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text" 
                pattern="\d*" 
                id="age"
                placeholder="Enter your Age"
                onChange={hAge}
                value={Age}
                required
              />
              {errorMessages.Age && (
                <p style={{ color: "red" }}>{errorMessages.Age}</p>
              )}
            </div>
            <div className="form-group-home">
              <label htmlFor="sbp" className="input-label-home">
                Systolic Blood Pressure <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text" 
                pattern="\d*" 
                id="sbp"
                placeholder="Enter your Systolic Blood Pressure"
                onChange={hSbp}
                value={Sbp}
                required
              />
              {errorMessages.Sbp && (
                <p style={{ color: "red" }}>{errorMessages.Sbp}</p>
              )}
            </div>
            <div className="form-group-home">
              <label htmlFor="dbp" className="input-label-home">
                Diastolic Blood Pressure <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text" 
                pattern="\d*" 
                id="dbp"
                placeholder="Enter your Diastolic Blood Pressure"
                onChange={hDbp}
                value={Dbp}
                required
              />
              {errorMessages.Dbp && (
                <p style={{ color: "red" }}>{errorMessages.Dbp}</p>
              )}
            </div>
            <input type="submit" value="Calculate" />
          </form>
          <h1>{ans}</h1>
        </center>
      </div>

      <div id="chat-icon">
        <ChatBot />
      </div>
    </>
  );
}

export default Home;
