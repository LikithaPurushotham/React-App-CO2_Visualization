import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("localhost:3001");
//Listen for random value generated from server and update the state
const App = () => {
  const [randomValue, setRandomValue] = useState(0);
  useEffect(() => {
    socket.on("value", (value) => {
      setRandomValue(value);
      console.log(value);
    });
  });
  //To change background color based on the threshold value
  const getBackgroundColor = (randomValue) => {
    if (randomValue <= 1000) {
      return "green";
    } else if (randomValue >= 1000 && randomValue <= 2000) {
      return "yellow";
    }
    return "red";
  };
  //Changing bgcolor based on values and Logging the text
  const colorTextMapping = {
    green: "CO2 Levels are Normal!",
    yellow: "CO2 Levels are slightly higher!",
    red: "CO2 Levels are High!",
  };
  const textMapping = {
    green: "Normal",
    yellow: "ALERT!!!!",
    red: "DANGER!!",
  };
  //To render the bgcolor using state
  const bgcolor = getBackgroundColor(randomValue);
  const msg = getBackgroundColor(randomValue);
  return (
    <main>
      <div className="container">
        <header>
          <h1 className="change-color">
            <strong>CO2 EMISSION TRACKER</strong>
          </h1>
        </header>
        <div className="box" style={{ backgroundColor: bgcolor }}>
          <p>
            <span>
              <strong>{randomValue}</strong>
            </span>
            ppm
          </p>
          <p className="para-set">{colorTextMapping[bgcolor]}</p>
        </div>
        <p className="block-example">
          <strong>{textMapping[msg]}</strong>
        </p>
      </div>
    </main>
  );
};
export default App;
