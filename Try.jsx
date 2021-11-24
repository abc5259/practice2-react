import React, { Component } from "react";

class Try extends Component {
  render() {
    console.log(this.props);
    return <li>{this.props.value}</li>;
  }
}

export default Try;
