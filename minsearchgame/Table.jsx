import React, { useContext } from "react";
import { TableContext } from "./MineSearch";
import Tr from "./Tr";

const Table = () => {
  const { tableData } = useContext(TableContext);
  return (
    <>
      <table>
        <tbody>
          {tableData.map((tr, index) => (
            <Tr key={index} rowIndex={index} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
