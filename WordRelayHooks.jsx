const React = require("react");
const { useState, useRef } = React;

const WordRelayHooks = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [word, setWord] = useState("이재훈");
  const inputRef = useRef(null);
  const onChange = e => {
    setValue(e.target.value);
  };
  const onSubmit = e => {
    e.preventDefault();
    if (word.endsWith(value.charAt(0))) {
      setResult("정답");
      setValue("");
      setWord(value);
      // inputRef.current.focus();
    } else {
      setValue("");
      setResult("땡");
    }
    inputRef.current.focus();
  };
  return (
    <>
      <h1>{word}</h1>
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          required
          onChange={onChange}
        />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelayHooks;
