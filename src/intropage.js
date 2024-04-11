import React from "react";
import { Bar, Pie, Line, Bubble } from "react-chartjs-2";
import "chart.js/auto";


const histodata = [
  { year: 2012, value: 18522 },
  { year: 2013, value: 19930 },
  { year: 2014, value: 18309 },
  { year: 2015, value: 18820 },
  { year: 2016, value: 21914 },
  { year: 2017, value: 23246 },
  { year: 2018, value: 28005 },
  { year: 2019, value: 28680 },
  { year: 2020, value: 28449 },
  { year: 2021, value: 28449 },
];

const pieData = [
  { name: "14 - 30 Years", value: 2665, color: "MediumSeaGreen" },
  { name: "30 - 45 Years", value: 8544, color: "orange" },
  { name: "45 - 60 Years", value: 11190, color: "Tomato" },
  { name: "60 year and above", value: 5985, color: "DodgerBlue" },
];

const barData = [
  { name: "Ischaemic heart disease", value: 1520000 },
  { name: "Haemorrhagic stroke", value: 432144 },
  { name: "Ischaemic stroke", value: 264894 },
  { name: "Hypertensive heart diseases", value: 108050 },
  { name: "Other circulatory diseases", value: 102640 },
  { name: "Cardiomyopathy, myocarditis, endocarditis", value: 12651 },
  { name: "Rheumatic heart disease", value: 126079 },
];

const lineData = [
  { name: "India", values: [44.59, 46.51, 41.73, 44.91, 38.92, 39.05] },
  { name: "China", values: [33.75, 34.4, 28.56, 30.48, 29.18, 26.95] },
  { name: "US", values: [27.85, 27.66, 27.16, 23.44, 21.81, 20.68] },
  { name: "Germany", values: [22.51, 19.31, 16.77, 14.76, 12.39, 11.28] },
  { name: "Japan", values: [15.93, 14.56, 13.88, 13.58, 12.39, 12.22] },
];

const scatterData = [
  { country: "Brazil", male: 176.0, female: 113.5, population: 213993441 },
  { country: "Egypt", male: 535.1, female: 393.6, population: 104258327 },
  { country: "Iran", male: 226.1, female: 199.1, population: 85950728 },
  { country: "Italy", male: 109.0, female: 74.4, population: 60367483 },
  { country: "Japan", male: 87.7, female: 45.4, population: 125804978 },
  { country: "Mexico", male: 248.0, female: 157.1, population: 128932753 },
  { country: "Philippines", male: 343.4, female: 212.8, population: 116686242 },
  { country: "Russia", male: 440.5, female: 229.1, population: 145912025 },
  { country: "South Africa", male: 252.2, female: 221.1, population: 61692409 },
  { country: "Thailand", male: 102.2, female: 59.4, population: 69950850 },
  { country: "United States", male: 166.3, female: 103.5, population: 332915073 },
];

const bubbleData = scatterData.map(({ country, male, female }) => ({
  x: male,
  y: female,
  r: 10,
  label: country,
}));

const areaData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 600 },
  { name: "Mar", value: 300 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
];

const IntroPage = () => {
  return (
    <div id="intro-welcome-text">
      <h1>Welcome to the Heart Disease Prediction System</h1>
      <div className="chart-container">
        <div className="chart-form">
          <h2 className="chart-title">
            Heart Attack deaths in india over years
          </h2>
          <Bar
            id="histo-chart"
            data={{
              labels: histodata.map((item) => item.year),
              datasets: [
                {
                  label: "Value",
                  data: histodata.map((item) => item.value),
                  backgroundColor: "#8884d8",
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Year",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Number of Deaths",
                  },
                },
              },
            }}
          />
        </div>

        <div className="chart-form">
          <h2 className="chart-title">
            Heart Attack Deaths by Age Group, India, 2021
          </h2>
          <Pie
            data={{
              labels: pieData.map((item) => item.name),
              datasets: [
                {
                  data: pieData.map((item) => item.value),
                  backgroundColor: pieData.map((item) => item.color),
                },
              ],
            }}
            options={{ maintainAspectRatio: false }}
          />
        </div>

        <div className="chart-form">
          <h2 className="chart-title">
            Number of deaths from cardiovascular diseases by type, India, 2019
          </h2>
          <Bar
            data={{
              labels: barData.map((item) => item.name),
              datasets: [
                {
                  label: "Value",
                  data: barData.map((item) => item.value),
                  backgroundColor: "#82ca9d",
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              indexAxis: "y", // Set the indexAxis option to 'y' for a horizontal bar chart
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Number of Deaths",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Disease Type",
                  },
                },
              },
            }}
          />
        </div>

        <div className="chart-form">
          <h2 className="chart-title">
            Death rate from cardiovascular diseases in 15 to 49 year olds
          </h2>
          <Line
            data={{
              labels: lineData.map(() => ""),
              datasets: lineData.map((line, index) => ({
                label: line.name,
                data: line.values,
                fill: false,
              })),
            }}
            options={{
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Years",
                  },
                  ticks: {
                    callback: (value, index) => {
                      const years = [1995, 2000, 2005, 2010, 2015, 2019];
                      return years[index];
                    },
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Values",
                  },
                },
              },
            }}
          />
        </div>

        <div className="chart-form">
          <h2 className="chart-title">
            Death rate from cardiovascular diseases by sex, 2021
          </h2>
          <Bubble
            data={{
              datasets: [
                {
                  data: bubbleData,
                  backgroundColor: "#8884d8",
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Death rate (per 100,000) - Male",
                  },
                  ticks: {
                    stepSize: 100,
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Death rate (per 100,000) - Female",
                  },
                  ticks: {
                    stepSize: 100,
                  },
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const data = context.raw;
                      return `${data.label}: Male - ${data.x}, Female - ${data.y}`;
                    },
                  },
                },
              },
            }}
          />
        </div>

        <div className="chart-form">
          <h2 className="chart-title">Area Chart</h2>
          <Line
            data={{
              labels: areaData.map((item) => item.name),
              datasets: [
                {
                  label: "Value",
                  data: areaData.map((item) => item.value),
                  backgroundColor: "#8884d8",
                  borderColor: "#8884d8",
                  fill: true,
                },
              ],
            }}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
