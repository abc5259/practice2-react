import React from "react";
import Td from "./Td.jsx";

const Tr = ({ rowData, rowIndex, dispatch }) => {
  return (
    <tr>
      {rowData.map((cellData, index) => (
        <Td
          key={index}
          rowIndex={rowIndex}
          cellIndex={index}
          cellData={cellData}
          dispatch={dispatch}
        />
      ))}
    </tr>
  );
};

export default Tr;
