import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.less";
import { Count } from "@/components/count.jsx";
import { BooleanTest } from "@/components/boolean.jsx";
import { List } from "./components/list.jsx";
import { FDemo } from "./components/functional/FDemo.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <>
      <h1
        style={{
          color: "blue",
          fontSize: "30px",
        }}
      >
        React App
      </h1>
      <Count />
      <p>Click the button to increase the count.</p>

      <BooleanTest />

      <List />
      <FDemo
        title="我是标题"
        num={10}
        className="test-box"
        style={{ fontSize: "20px" }}
        data={[1, 2, 3, 4, 5]}
      />
    </>
  </React.StrictMode>
);
