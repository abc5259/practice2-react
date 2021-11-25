import React, { PureComponent } from "react";

class Test extends PureComponent {
  state = {
    counter: 0,
  };

  onClick = () => {
    this.setState({
      counter: "1",
    });
  };

  render() {
    console.log("랜더링", this.state);
    return (
      <>
        <div>
          <button onClick={this.onClick}>클릭</button>
        </div>
      </>
    );
  }
}
export default Test;
