import { useMemo, useState } from "react";
import "./InteractiveChart.css";

import BarChart from "./Barchart";
import useTooltip from "./use-tooltip";

const Y_AXIS_LABEL = "Number of Tickets";
const X_AXIS_LABEL = "Departments";

const InteractiveChart = ({ data }) => {
  const [enter, leave, tooltip] = useTooltip();
  const maxTicketCount = useMemo(() => {
    return Math.max(...data.map((col) => col.ticketCount));
  }, [data]);

  return (
    <div className="interactive-chart">
      <div className="y-axis">{Y_AXIS_LABEL}</div>
      <div className="bars">
        {tooltip}
        {data.map((col) => {
          return (
            <BarChart
              key={col.id}
              height={(col.ticketCount / maxTicketCount) * 100}
              value={col.ticketCount}
              color={col.colour}
              name={col.name}
              enter={enter}
              leave={leave}
            />
          );
        })}
      </div>
      <div className="x-axis">{X_AXIS_LABEL}</div>
    </div>
  );
};

export default InteractiveChart;
