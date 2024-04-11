import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import ChatBot from "./ChatBot";

function Home() {
 const [bmi, setBmi] = useState("");
 const [age, setAge] = useState("");
 const [sbp, setSbp] = useState("");
 const [dbp, setDbp] = useState("");
 const [prediction, setPrediction] = useState("");
 const [errors, setErrors] = useState({
   bmi: "",
   age: "",
   sbp: "",
   dbp: "",
 });

 const navigate = useNavigate();
 const location = useLocation();

 const removeNonDigits = (value) => {
   // Remove all non-digit characters using regex
   return value.replace(/\D/g, "");
 };

 const handleBmiChange = (event) => {
   const value = event.target.value;
   // Allow digits and at most one decimal point for BMI
   const sanitizedValue = value.replace(/[^0-9.]/g, "");
   setBmi(sanitizedValue);
   setErrors({ ...errors, bmi: "" });
 };

 const handleAgeChange = (event) => {
   const value = event.target.value;
   const sanitizedValue = removeNonDigits(value);
   setAge(sanitizedValue);
   setErrors({ ...errors, age: "" });
 };

 const handleSbpChange = (event) => {
   const value = event.target.value;
   const sanitizedValue = removeNonDigits(value);
   setSbp(sanitizedValue);
   setErrors({ ...errors, sbp: "" });
 };

 const handleDbpChange = (event) => {
   const value = event.target.value;
   const sanitizedValue = removeNonDigits(value);
   setDbp(sanitizedValue);
   setErrors({ ...errors, dbp: "" });
 };

 const getPrediction = async () => {
  try {
    // Make API request to Flask server for prediction
    const response = await axios.post("http://127.0.0.1:5000/predict", {
      BMI: bmi,
      Age: age,
      "Systolic Blood Pressure": sbp,
      "Diastolic Blood Pressure": dbp,
    });

    // Update the state with the prediction received from the API
    const predictionValue = response.data.prediction;
    const predictionText = predictionValue === 1 ? "You may have heart disease" : "You don't have heart disease";
    setPrediction(predictionText);
  } catch (error) {
    console.error("Error occurred while fetching prediction:", error);
    setPrediction("An error occurred. Please try again later.");
  }
};

 const validateForm = () => {
   let isValid = true;
   const newErrors = { ...errors };

   if (!bmi.trim()) {
     newErrors.bmi = "BMI is required.";
     isValid = false;
   }

   if (!age.trim()) {
     newErrors.age = "Age is required.";
     isValid = false;
   }

   if (!sbp.trim()) {
     newErrors.sbp = "Systolic Blood Pressure is required.";
     isValid = false;
   }

   if (!dbp.trim()) {
     newErrors.dbp = "Diastolic Blood Pressure is required.";
     isValid = false;
   }

   setErrors(newErrors);
   return isValid;
 };

 const handleSubmit = (event) => {
   event.preventDefault();

   // Validate input fields
   const isValid = validateForm();

   if (isValid) {
     // If all fields are filled, proceed with making API request for prediction
     getPrediction();
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
         <form onSubmit={handleSubmit}>
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
               pattern="\d+(\.\d{1,2})?" // Allow digits with optional decimal up to 2 places
               id="bmi"
               placeholder="Enter your BMI"
               onChange={handleBmiChange}
               value={bmi}
               required
             />
             {errors.bmi && <p style={{ color: "red" }}>{errors.bmi}</p>}
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
               onChange={handleAgeChange}
               value={age}
               required
             />
             {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
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
               onChange={handleSbpChange}
               value={sbp}
               required
             />
             {errors.sbp && <p style={{ color: "red" }}>{errors.sbp}</p>}
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
               onChange={handleDbpChange}
               value={dbp}
               required
             />
             {errors.dbp && <p style={{ color: "red" }}>{errors.dbp}</p>}
           </div>
           <input type="submit" value="Calculate" />
         </form>
         <h1>{prediction}</h1> {/* Display the prediction result here */}
       </center>
     </div>

     <div id="chat-icon">
       <ChatBot />
     </div>
   </>
 );
}

export default Home;