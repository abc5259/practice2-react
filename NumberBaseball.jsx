import React, { Component } from "react";
import Try from "./Try";

function getnumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}
class NumberBaseball extends Component {
  state = {
    result: "",
    value: "",
    answer: getnumbers(),
    tries: [],
  };
  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join("")) {
      this.setState({
        result: "홈런",
        tries: [...this.state.tries, { try: this.state.value, result: "홈런" }],
      });
      alert("게임을 다시 시작합니디");
      this.setState({
        value: "",
        answer: getnumbers(),
        tries: [],
      });
    } else {
      const answerArray = this.state.value.split("").map(v => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(
            ","
          )}이었습니다.`,
          answer: getnumbers(),
        });
        alert("게임을 다시 시작합니디");
        this.setState({
          value: "",
          answer: getnumbers(),
          tries: [],
        });
      } else {
        answerArray.forEach((item, i) => {
          if (item === this.state.answer[i]) strike++;
          else if (this.state.answer.indexOf(item) !== -1) ball++;
        });
        this.setState({
          result: `${strike}스트라이크 ${ball}볼`,
          tries: [
            ...this.state.tries,
            { try: this.state.value, result: `${strike}스트라이크 ${ball}볼` },
          ],
          value: "",
        });
      }
    }
  };
  render() {
    return (
      <>
        <div>숫자야구</div>
        <form onSubmit={this.onSubmit}>
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
            <Try
              key={`${item.result}${item.try}+${i}`}
              tryInfo={item}
              index={i}
            />
          ))}
        </ul>
        <div>{this.state.result}</div>
      </>
    );
  }
}
export default NumberBaseball;
