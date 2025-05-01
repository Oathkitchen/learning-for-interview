import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.less";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div>test</div>
  </React.StrictMode>
);

fetch("/jian/subscriptions/recommended_collections")
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
  });

fetch("/zhi/news/latest")
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
  });
