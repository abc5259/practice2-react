import React, { useCallback, useReducer, useState } from "react";
import Table from "./Table";

const initialState = {
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
};

export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";

const reducer = (state, action) => {
  // state를 어떻게 바꿀지
  switch (
    action.type //action에 disPatch에 적어준 값이 들어감
  ) {
    case SET_WINNER:
      // state.winner = action.winner 이렇게 직접 바꾸면 안된다.
      return {
        //새로운 객체를 만들어서 state의 바뀐값만 바꿔준다.
        ...state,
        winner: action.winner,
      };
    case CLICK_CELL:
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
      };
    case CHANGE_TURN:
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O",
      };
  }
};

const TicTakToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onClickTable = useCallback(() => {
    dispatch({ type: "SET_WINNER", winner: "O" }); //disPatch를 하면 reducer가 실행됨
  }, []);
  return (
    <>
      <Table
        onClick={onClickTable}
        tableData={state.tableData}
        dispatch={dispatch}
      />
      {state.winner && <div>{state.winner}님의 승리</div>}
    </>
  );
};

export default TicTakToe;
