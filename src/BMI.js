import React, { useState } from 'react';
import './App.css';

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  const blockSpecialCharacters = (value) => {
    // Remove all special characters using regex
    return value.replace(/[^\d.]/g, '');
  };

  const handleWeightChange = (event) => {
    // Block special characters and update state
    setWeight(blockSpecialCharacters(event.target.value));
  };

  const handleHeightChange = (event) => {
    // Block special characters and update state
    setHeight(blockSpecialCharacters(event.target.value));
  };

  const calcBmi = (event) => {
    event.preventDefault();

    // Validate input using regex (allow only positive numbers)
    const regex = /^\d*\.?\d+$/;

    if (!regex.test(weight) || !regex.test(height) || weight <= 0 || height <= 0) {
      alert('Please enter valid positive numerical values for weight and height.');
      return;
    }

    // Calculate BMI using metric units (weight in kg, height in meters)
    const bmiResult = (parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2)).toFixed(1);
    setBmi(bmiResult);

    // Logic for message
    if (bmiResult < 18.5) {
      setMessage('Underweight');
    } else if (bmiResult >= 18.5 && bmiResult < 25) {
      setMessage('Normal Weight');
    } else if (bmiResult >= 25 && bmiResult < 30) {
      setMessage('Overweight');
    } else {
      setMessage('Obese');
    }
  };

  const reload = () => {
    setWeight('');
    setHeight('');
    setBmi('');
    setMessage('');
  };

  return (
    <div className="app">
      <div className="container bmi-container">
        <h2 className="center bmi-title">BMI Calculator</h2>
        <form className="bmi-form" onSubmit={calcBmi}>
          <div>
            <label className="bmi-label" htmlFor="weight">Weight (kg)<span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="bmi-input"
              type="text"
              id="weight"
              value={weight}
              onChange={handleWeightChange}
              required
            />
          </div>
          <div>
            <label className="bmi-label" htmlFor="height">Height (cm)<span style={{ color: "red" }}>*</span></label>
            <input
              className="bmi-input"
              type="text"
              id="height"
              value={height}
              onChange={handleHeightChange}
              required
            />
          </div>
          <div className="bmi-buttons">
            <button className="bmi-submit" type="submit">
              Calculate
            </button>
            <button
              className="bmi-reload"
              onClick={reload}
              type="button"
            >
              Reset
            </button>
          </div>
        </form>
        {bmi && (
          <div className="center">
            <h3 className="bmi-result">Your BMI is: {bmi}</h3>
            <p className="bmi-message">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
