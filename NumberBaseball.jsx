import React, { Component } from "react";
import Try from "./Try";

function getnumbers() {}
class NumberBaseball extends Component {
  state = {
    result: "",
    value: "",
    answer: getnumbers(),
    tries: [1, 2, 3, 4],
  };
  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  render() {
    return (
      <>
        <div>숫자야구</div>
        <form>
          <input
            type="number"
            value={this.state.value}
            onChange={this.onChange}
            maxLength={4}
          />
          <button>입력</button>
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map((item, i) => (
            <Try key={item} value={item} index={i} />
          ))}
        </ul>
      </>
    );
  }
}
export default NumberBaseball;
