import { memo } from "react";
import "./Circle.css";

const Circle = ({ x, y, color }) => {
  console.log(`circle ${x}, ${y} is rendered`);
  return (
    <div
      className="circle"
      style={{
        backgroundColor: `${color}`,
        left: `${x}px`,
        top: `${y}px`,
      }}
    ></div>
  );
};

export default memo(Circle);
