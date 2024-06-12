import { useState } from "react";
import "./Barchart.css";

import useBarChart from "./use-bar-chart";

const BarChart = (props) => {
  const { value, color, name, enter, leave, height } = props;
  const [updatedHeight] = useBarChart({ value, color, height });

  const onMouseEnter = (event) => {
    enter({ event, value, name });
  };

  const onMouseLeave = (event) => {
    leave({ event, value, name });
  };

  return (
    <div
      className="bar-chart"
      style={{
        height: `${updatedHeight}%`,
        backgroundColor: `${color}`,
        width: "50px",
      }}
      onMouseEnter={(e) => onMouseEnter(e)}
      onMouseLeave={(e) => onMouseLeave(e)}
    ></div>
  );
};

export default BarChart;
