import React, { useContext } from "react";
import { TableContext } from "./MineSearch";
import Tr from "./Tr";

const Table = () => {
  const { tableData } = useContext(TableContext);
  return (
    <>
      <table>
        <tbody>
          {Array(tableData.length)
            .fill()
            .map((row, i) => (
              <Tr rowIndex={i} />
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
