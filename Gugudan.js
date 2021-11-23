const React = require("react");
const { useState, useRef } = React;

const Gugudan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);
  const onSubmit = e => {
    e.preventDefault();
    if (parseInt(value) === first * second) {
      setResult(`정답 ${value}`);
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue("");
    } else {
      setResult("땡!");
      setValue("");
    }
    inputRef.current.focus();
  };
  const onChange = e => {
    setValue(e.target.value);
  };
  return (
    <div>
      <h1>구구단</h1>
      <h3>
        {first}곱하기{second}은?
      </h3>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} type="number" value={value} onChange={onChange} />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </div>
  );
};

module.exports = Gugudan;
