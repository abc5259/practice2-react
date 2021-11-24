const React = require("react");
const { Component } = React;

class WordRelay extends Component {
  state = {
    word: "awdaw",
    value: "",
    result: "",
  };
  onChange = e => {
    this.setState({ value: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.word.endsWith(this.state.value.charAt(0))) {
      this.setState({
        word: this.state.value,
        value: "",
        result: "딩동댕",
      });
      this.input.focus();
    } else {
      this.setState({
        value: "",
        result: "땡",
      });
    }
  };
  input;
  onRefInput = c => (this.input = c);
  render() {
    return (
      <>
        <h1>{this.state.word}</h1>
        <form onSubmit={this.onSubmit}>
          <input
            ref={this.onRefInput}
            type="text"
            value={this.state.value}
            required
            onChange={this.onChange}
          />
          <button>입력</button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

module.exports = WordRelay;
