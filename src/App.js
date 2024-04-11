// App.js
import logo from './logo.svg';
import './App.css';
import Enquiry from './Enquiry.js';
import Sign from './Signup.js';
import Navbar from "./Navbar";
import Home from "./Home";
import { app } from "./Firebaseconfig.js";
import Login from "./Login1.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import IntroPage from "./intropage.js"; 
import ChatBot from "./ChatBot"; // Update the import statement
import BMI from "./BMI.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/IntroPage" replace />} />
          <Route path="/IntroPage" element={<IntroPage />} />
          <Route path="/Login1" element={<Login />} />
          <Route path="/Enquiry" element={<Enquiry />} />
          <Route path="/Chatbot" element={<ChatBot />} /> 
          <Route path="/Home" element={<Home />} />
          <Route path="/BMI" element={<BMI />} />
          <Route path="/Signup" element={<Sign />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
