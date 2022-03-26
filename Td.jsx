import React, { memo, useCallback } from "react";
import { CLICK_CELL } from "./TicTakToe";

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
  console.log("td");
  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    if (cellData === "") {
      dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    }
  }, [cellData]);
  return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
