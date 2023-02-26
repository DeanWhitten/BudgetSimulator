import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Expenses from "./Components/Expenses";
import Income from "./Components/Income";
import { Card } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));

const gridStyle = {
  width: '50%',
  textAlign: 'center',
};

root.render(
  <div
    style={{
      display: "flex",
    }}
  >
    <Card
      title=<h1>Budget Simulator </h1>
      style={{
        display: "flex",
        alignItems: "center",
        width: "100vw",
      }}
    >
      <Card.Grid style={gridStyle}>
        <Income />
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <Expenses />
      </Card.Grid>
    </Card>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
