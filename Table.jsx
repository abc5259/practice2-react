import React from "react";
import Tr from "./Tr";

const Table = ({ tableData, dispatch }) => {
  return (
    <table>
      {tableData.map((rowData, index) => (
        <Tr
          key={index}
          rowIndex={index}
          rowData={rowData}
          dispatch={dispatch}
        />
      ))}
    </table>
  );
};

export default Table;
