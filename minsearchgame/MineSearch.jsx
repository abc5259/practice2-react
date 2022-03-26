import React, { useReducer, createContext, useMemo } from "react";
import Form from "./Form";
import Table from "./Table";

export const CODE = {
  OPEND: 0,
  NOMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICK_MINE: -6,
  MINE: -7,
};

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => {
      return i;
    });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NOMAL);
    }
  }
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }
  console.log(data);
  return data;
};

export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
  halted: false,
});

const initalState = {
  tableData: [],
  timer: 0,
  result: "",
  halted: false,
};

export const START_GAME = "START_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const CLECK_MINE = "CLECK_MINE";
export const FLAGE_CELL = "FLAGE_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NOMALIZE_CELL = "NOMALIZE_CELL";

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
      };
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });
      const checked = [];
      const checkArround = (row, cell) => {
        if (
          [
            CODE.OPEND,
            CODE.FLAG_MINE,
            CODE.FLAG,
            CODE.QUESTION_MINE,
            CODE.QUESTION,
          ].includes(tableData[row][cell])
        ) {
          return;
        }
        if (
          row < 0 ||
          row >= tableData.length ||
          cell < 0 ||
          cell >= tableData[row].length
        )
          return;
        if (checked.includes(row + "," + cell)) return;
        else {
          checked.push(row + "," + cell);
        }
        let around = [];
        if (tableData[row - 1]) {
          around = around.concat(
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1]
          );
        }
        if (tableData[row + 1]) {
          around = around.concat(
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1]
          );
        }
        around = around.concat(
          tableData[row][cell - 1],
          tableData[row][cell + 1]
        );
        const count = around.filter(v =>
          [CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.MINE].includes(v)
        ).length;
        if (count === 0) {
          if (row > -1) {
            const near = [];
            if (row - 1 > -1) {
              near.push([row - 1, cell - 1]);
              near.push([row - 1, cell]);
              near.push([row - 1, cell + 1]);
            }
            if (row + 1 < tableData.length) {
              near.push([row + 1, cell - 1]);
              near.push([row + 1, cell]);
              near.push([row + 1, cell + 1]);
            }
            near.push([row, cell - 1]);
            near.push([row, cell + 1]);
            near.forEach(n => {
              if (tableData[n[0]][n[1]] !== CODE.OPEND) {
                checkArround(n[0], n[1]);
              }
            });
          }
        }
        tableData[row][cell] = count;
      };
      checkArround(action.row, action.cell);
      return {
        ...state,
        tableData,
      };
    }
    case CLECK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICK_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      };
    }
    case FLAGE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NOMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      } else {
        tableData[action.row][action.cell] = CODE.NOMAL;
      }
      return {
        ...state,
        tableData,
      };
    }
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initalState);
  const { tableData, halted, timer, result } = state;
  const value = useMemo(
    () => ({
      tableData,
      dispatch,
      halted,
    }),
    [tableData, halted]
  );
  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table></Table>
      <div>{result}</div>
    </TableContext.Provider>
  );
};

export default MineSearch;
