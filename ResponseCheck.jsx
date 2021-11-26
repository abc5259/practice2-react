import React, { Component } from "react";

class ResponseCheck extends Component {
  state = {
    state: "waiting",
    message: "클릭해서 시작하세요",
    result: [],
  };

  timout;
  startTime;
  endTime;
  onClickScreen = () => {
    const { state, message, result } = this.state;
    let time;
    if (state === "waiting") {
      this.setState({
        state: "ready",
        message: "초록색이 되면 클릭하세요",
      });
      this.timout = setTimeout(() => {
        this.setState({
          state: "now",
          message: "클릭 하세요!",
        });
      }, Math.random() * 1000 + 2000);
      this.startTime = new Date();
    } else if (state === "ready") {
      this.setState({
        state: "waiting",
        message: "너무 성급하시군요! 초록색이 된 후에 클릭하세요",
      });
      clearTimeout(this.timout);
    } else if (state === "now") {
      this.endTime = new Date();
      this.setState(prevState => {
        return {
          state: "waiting",
          message: "클릭해서 시작하세요",
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };
  onResetBtnClick = () => {
    this.setState({
      result: [],
    });
  };
  renderAverage = () => {
    const { result } = this.state;
    return result.length > 0 ? (
      <>
        <div>
          평균시간: {result.reduce((a, c) => a + c) / result.length}
          ms
        </div>
        <button onClick={this.onResetBtnClick}>리셋</button>
      </>
    ) : null;
  };
  render() {
    return (
      <>
        <div
          id="screen"
          className={this.state.state}
          onClick={this.onClickScreen}
        >
          {this.state.message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}

export default ResponseCheck;
