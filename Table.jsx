import React from "react";
import Tr from "./Tr";

const Table = ({ onClick, tableData, dispatch }) => {
  return (
    <table>
      <tbody>
        {Array(tableData.length)
          .fill()
          .map((tr, i) => (
            <Tr rowIndex={i} rowData={tableData[i]} dispatch={dispatch}>
              {""}
            </Tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
