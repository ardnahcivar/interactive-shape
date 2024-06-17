import { useState, useRef } from "react";

import "./CircleGame.css";
import Circle from "./Circle";

const COLORS = [
  "#2c3e50",
  "#34495e",
  "#c0392b",
  "#e74c3c",
  "#27ae60",
  "#3498db",
  "#f39c12",
  "#f1c40f",
];

const CircleGame = () => {
  const [circles, addCircle] = useState([]);
  const [undo, setUndo] = useState([]);
  const boundary = useRef();

  const undoOp = () => {
    const latestCircle = circles[circles.length - 1];
    circles.length = circles.length - 1;

    setUndo((u) => u.concat(latestCircle));
  };

  const redoOp = () => {
    if (undo.length) {
      const latestCircle = undo[undo.length - 1];
      undo.length = undo.length - 1;

      addCircle((c) => c.concat(latestCircle));
    }
  };

  const resetOp = () => {
    addCircle([]);
    setUndo([]);
  };

  const handleAddCircle = (event) => {
    const { left, top, bottom, right } =
      boundary.current.getBoundingClientRect();

    if (
      event.clientX - 30 - left <= 0 ||
      event.clientY - 30 - top <= 0 ||
      event.clientX + 30 - right >= 0 ||
      event.clientY + 30 - bottom >= 0
    ) {
      return;
    }

    const colorIndex = Math.floor(Math.random() * 9);

    addCircle((c) =>
      c.concat({
        x: event.clientX - 30,
        y: event.clientY - 30,
        id: Date.now(),
        color: COLORS[colorIndex],
      }),
    );
  };

  return (
    <div className="container">
      <div className="circle-game-ops">
        <button onClick={undoOp}>undo</button>
        <button onClick={redoOp}>redo</button>
        <button onClick={resetOp}>reset</button>
      </div>
      <div ref={boundary} className="circle-game" onClick={handleAddCircle}>
        <div className="circles">
          {circles.map((circle) => {
            return (
              <Circle
                key={circle.id}
                x={circle.x}
                y={circle.y}
                color={circle.color}
              />
            );
          })}
        </div>
      </div>
      <p>click within the rectangle to draw a circle</p>
    </div>
  );
};

export default CircleGame;
