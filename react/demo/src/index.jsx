import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.less";

const root = ReactDOM.createRoot(document.getElementById("root"));

class Count extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
    };
  }

  render() {
    return (
      <>
        <span> {this.state.num} </span>
        <br />
        <button
          onClick={() => {
            this.setState({ num: this.state.num + 1 });
          }}
        >
          add
        </button>
      </>
    );
  }
}

root.render(
  <React.StrictMode>
    <>
      <h1 style={{
        color: "blue",
        fontSize: "30px",
        textAlign: "center",
        marginTop: "20px",
      }}>React App</h1>
      <Count />
      <p>Click the button to increase the count.</p>
    </>
  </React.StrictMode>
);
