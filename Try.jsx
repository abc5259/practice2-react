import React, { Component } from "react";

class Try extends Component {
  render() {
    console.log(this.props);
    return (
      <li>
        {this.props.tryInfo.result}, {this.props.tryInfo.try}
      </li>
    );
  }
}

export default Try;
