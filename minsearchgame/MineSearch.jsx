import React, { useReducer, createContext, useMemo } from "react";
import Form from "./Form";
import Table from "./Table";

export const CODE = {
  MINE: -7,
  NORMAL: -1, //정상칸
  QUESTION: -2, //물음표
  FLAG: -3, //깃발
  QUESTION_MINE: -4, //물음표 && 지뢰
  FLAG_MINE: -5, // 깃발 && 지뢰
  CLICKED_MINE: -6, //지뢰칸 클릭
  OPENED: 0, //열린칸
};

export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  timer: 0,
  result: 0,
};

export const START_GAME = "START_GAME";

const reducer = () => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
      };
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(
    () => ({ tableData: state.tableData, dispatch }),
    [state.tableData]
  );
  return (
    //MineSearch가 새로생길때마다 객체가 새로생긴다 -> 성능문제
    <TableContext.Provider value={value}>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  );
};

export default MineSearch;
