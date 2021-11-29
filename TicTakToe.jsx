import React, { useCallback, useEffect, useReducer, useState } from "react";
import Table from "./Table";

const initialState = {
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  recentCell: [-1, -1],
};

export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";
export const RESET_GAME = "RESET_GAME";

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
        recentCell: [action.row, action.cell],
      };
    case CHANGE_TURN:
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O",
      };
    case RESET_GAME:
      return {
        ...state,
        turn: "O",
        tableData: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        recentCell: [-1, -1],
      };
    default:
      return state;
  }
};

const TicTakToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { winner, tableData, turn, recentCell } = state;
  const onClickTable = useCallback(() => {
    dispatch({ type: "SET_WINNER", winner: "O" }); //disPatch를 하면 reducer가 실행됨
  }, []);

  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    }
    let win = false;
    if (
      tableData[row][0] === turn &&
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][cell] === turn &&
      tableData[1][cell] === turn &&
      tableData[2][cell] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][0] === turn &&
      tableData[1][1] === turn &&
      tableData[2][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][2] === turn &&
      tableData[1][1] === turn &&
      tableData[2][0] === turn
    ) {
      win = true;
    }
    console.log(row, cell, turn);
    if (win) {
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
      console.log(tableData);
    } else {
      let all = true;
      tableData.forEach(row => {
        row.forEach(cell => {
          if (!cell) all = false;
        });
      });
      if (all) {
        dispatch({ type: SET_WINNER, winner: "무승부" });
        dispatch({ type: RESET_GAME });
      } else dispatch({ type: CHANGE_TURN });
    }
  }, [recentCell]);
  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default TicTakToe;
