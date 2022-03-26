import React, { useContext } from "react";
import { TableContext } from "./MineSearch";
import Td from "./Td";

const Tr = ({ rowIndex }) => {
  const { tableData } = useContext(TableContext);
  return (
    <tr>
      {tableData[rowIndex].map((td, index) => (
        <Td key={index} rowIndex={rowIndex} cellIndex={index} />
      ))}
    </tr>
  );
};

export default Tr;
