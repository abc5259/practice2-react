import React, { useCallback, useContext } from "react";
import {
  CLECK_MINE,
  CODE,
  FLAGE_CELL,
  NOMALIZE_CELL,
  OPEN_CELL,
  QUESTION_CELL,
  TableContext,
} from "./MineSearch";

const getTdStyle = code => {
  switch (code) {
    case CODE.NOMAL:
    case CODE.MINE:
      return {
        background: "#444",
      };
    case CODE.CLICK_MINE:
    case CODE.OPEND:
      return {
        background: "#fff",
      };
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return {
        background: "red",
      };
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return {
        background: "yellow",
      };
    default:
      return {
        background: "#fff",
      };
  }
};

const getTdText = code => {
  switch (code) {
    case CODE.NOMAL:
      return "";
    case CODE.MINE:
      return "X";
    case CODE.CLICK_MINE:
      return "펑";
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return "!";
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return "?";
    default:
      return code || "";
  }
};

const Td = ({ rowIndex, cellIndex }) => {
  const { tableData, dispatch, halted } = useContext(TableContext);
  const onClickTd = useCallback(() => {
    console.log(halted);
    if (halted) return;
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPEND:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return;
      case CODE.NOMAL:
        dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.MINE:
        dispatch({ type: CLECK_MINE, row: rowIndex, cell: cellIndex });
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted]);

  const onRightClickTd = useCallback(
    e => {
      e.preventDefault();
      if (halted) return;
      switch (tableData[rowIndex][cellIndex]) {
        case CODE.NOMAL:
        case CODE.MINE:
          dispatch({ type: FLAGE_CELL, row: rowIndex, cell: cellIndex });
          return;
        case CODE.FLAG:
        case CODE.FLAG_MINE:
          dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
          return;
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          dispatch({ type: NOMALIZE_CELL, row: rowIndex, cell: cellIndex });
          return;
        default:
          return;
      }
    },
    [tableData[rowIndex][cellIndex], halted]
  );
  return (
    <>
      <td
        style={getTdStyle(tableData[rowIndex][cellIndex])}
        onClick={onClickTd}
        onContextMenu={onRightClickTd}
      >
        {getTdText(tableData[rowIndex][cellIndex])}
      </td>
    </>
  );
};

export default Td;
