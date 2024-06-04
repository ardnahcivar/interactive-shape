import { useState, useRef, useEffect } from "react";

import Square from "./Square";
import "./Box.css";

const ZEROES = [0, 0, 0, 0, 0];
const ROWS_ZERO_STATE = [];
for (let i = 0; i < 5; i++) {
  ROWS_ZERO_STATE.push(ZEROES);
}

const getActiveSquares = (boxState) => {
  let counter = 0;
  boxState.map((row) => {
    row.map((sq) => {
      if (sq === 1) {
        counter++;
      }
    });
  });
  return counter;
};

const Box = () => {
  const timerRef = useRef(null);
  const [intervalCounter, setIntervalCounter] = useState(0);
  const [clickOrder, setClickOrder] = useState([]);
  const [activeSquaresCount, setActiveSquaresCount] = useState(0);

  const [boxState, setBoxState] = useState([
    [1, 1, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 1, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 0, 1, 1],
  ]);

  useEffect(() => {
    setActiveSquaresCount(getActiveSquares(boxState));
  }, []);

  const resetMatrix = () => {
    setBoxState(ROWS_ZERO_STATE);
    setClickOrder([]);
    setIntervalCounter(0);
    setActiveSquaresCount(getActiveSquares(ROWS_ZERO_STATE));
  };

  const handleSquareClick = (event) => {
    let id = event.target.id;
    if (id) {
      let [row, col] = id.split("-");
      row = +row;
      col = +col;

      const updatedRow = [
        ...boxState[row].slice(0, col),
        1,
        ...boxState[row].slice(col + 1),
      ];

      setBoxState((box) => [
        ...box.slice(0, row),
        updatedRow,
        ...box.slice(row + 1),
      ]);
      setClickOrder((order) => [...order, id]);
    }
  };

  const startHighlight = () => {
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      if (intervalCounter === clickOrder.length) {
        clearInterval(timerRef.current);
        setClickOrder([]);
        setIntervalCounter(0);
      } else {
        let [row, col] = clickOrder[intervalCounter].split("-");
        row = +row;
        col = +col;

        const updatedRow = [
          ...boxState[row].slice(0, col),
          0,
          ...boxState[row].slice(col + 1),
        ];

        setIntervalCounter((c) => c + 1);
        setBoxState((box) => [
          ...box.slice(0, row),
          updatedRow,
          ...box.slice(row + 1),
        ]);
      }
    }, 1000);
  };

  if (
    clickOrder.length ===
    boxState.length * boxState[0].length - activeSquaresCount
  ) {
    startHighlight();
  }

  return (
    <div className="container" onClick={handleSquareClick}>
      <div className="reset-buttons" onClick={resetMatrix}>
        <button>Reset the matrix</button>
      </div>
      <div>
        {boxState.map((elem, i) => {
          return (
            <div className="row" key={i}>
              {elem.map((sq, j) => {
                const isOn = sq === 1;
                const k = `${i}-${j}-${isOn}`;
                return <Square key={k} isOn={isOn} row={i} col={j} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Box;
