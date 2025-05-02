import React from "react";

export class Count extends React.Component {
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