import React, { useState, useEffect, useRef } from "react";

const ResponseCheckHooks = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState([]);
  const timout = useRef(null);
  const startTime = useRef(null);
  const endTime = useRef(null);
  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색이 되면 클릭하세요");
      timout.current = setTimeout(() => {
        setState("now");
        setMessage("클릭 하세요!");
        startTime.current = new Date();
      }, Math.random() * 1000 + 2000);
      console.log(startTime.current);
    } else if (state === "ready") {
      setState("waiting");
      setMessage("너무 성급하시군요! 초록색이 된 후에 클릭하세요");
      clearTimeout(timout.current);
    } else if (state === "now") {
      endTime.current = new Date();
      console.log(endTime.current - startTime.current);
      setState("waiting");
      setMessage("클릭해서 시작하세요");
      setResult(prevResult => [
        ...prevResult,
        endTime.current - startTime.current,
      ]);
    }
  };
  const onResetBtnClick = () => {
    setResult([]);
  };
  const renderAverage = () => {
    return result.length > 0 ? (
      <>
        <div>
          평균시간: {result.reduce((a, c) => a + c) / result.length}
          ms
        </div>
        <button onClick={onResetBtnClick}>리셋</button>
      </>
    ) : null;
  };
  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
};

export default ResponseCheckHooks;
