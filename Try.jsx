import React, { useState } from "react";

const Try = ({ tryInfo }) => {
  return (
    <li>
      {tryInfo.result}, {tryInfo.try}
    </li>
  );
};

export default Try;
