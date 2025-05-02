import React from "react";

export class BooleanTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTrue: false,
    };
  }

  render() {
    return (
      <>
        <span> {this.state.isTrue ? "true" : "false"} </span>
        <br />
        <button
          onClick={() => {
            this.setState({ isTrue: !this.state.isTrue });
          }}
        >
          toggle
        </button>
      </>
    );
  }
}