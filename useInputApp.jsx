import React, { useState } from "react";

const useInput = (initialvalue, validator) => {
  const [value, setValue] = useState(initialvalue);
  const onChange = event => {
    const {
      target: { value },
    } = event;
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
      console.log(willUpdate);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

const UseInputApp = () => {
  const maxLen = value => value.length <= 10;
  const name = useInput("LeeJaeHoon", maxLen);
  return (
    <div>
      <h1>hello</h1>
      <input type="text" placeholder="Name" {...name} />
    </div>
  );
};

export default UseInputApp;
