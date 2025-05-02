import React from "react";

export class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    this.setState({
      list: [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
      ],
    });
  }
  render() {
    return (
      <div>
        <h2>List of Items</h2>
        <ul>
          {this.state.list.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
