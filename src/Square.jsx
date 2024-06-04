import { memo } from "react";

import "./Square.css";

function Square({ row, col, isOn = false }) {
  console.log(`square re-render ${row}-${col}`);
  return (
    <span
      className={`square ${isOn ? "on" : "off"}`}
      id={`${row}-${col}`}
    ></span>
  );
}

const SquareMemoized = memo(Square);

export default SquareMemoized;
