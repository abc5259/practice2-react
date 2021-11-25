import React, { memo, useState } from "react";

const Try = memo(({ tryInfo }) => {
  return (
    <li>
      {tryInfo.result}, {tryInfo.try}
    </li>
  );
});

export default Try;
