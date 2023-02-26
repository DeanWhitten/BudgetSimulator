import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Expenses from "./Components/Expenses";
import Income from "./Components/Income";
import { Col, Row,Statistic } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div>
    <Row>
      <Col span={20}>
        <h1 style={{ paddingLeft: "100px", position: "sticky" }}>
          Budget Simulator
        </h1>
      </Col>
     <Col style={{paddingLeft:'21px', textAlign:'right'}}><Statistic title="Leftover" value={112893}></Statistic></Col> 
    </Row>

    <Row style={{ paddingLeft: "100px" }}>
      <Col span={12}>
        <Income />
      </Col>
      <Col span={12}>
        <Expenses />
      </Col>
    </Row>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
