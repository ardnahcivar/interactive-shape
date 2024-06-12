import { useState } from "react";

import "./App.css";
import InteractiveChart from "./InteractiveChart";

import Box from "./Box";

const CHART_DATA = [
  { id: "dep-1", name: "Legal", ticketCount: 32, colour: "#3F888F" },
  { id: "dep-2", name: "Sales", ticketCount: 20, colour: "#FFA420" },
  { id: "dep-3", name: "Engineering", ticketCount: 60, colour: "#287233" },
  { id: "dep-4", name: "Manufacturing", ticketCount: 5, colour: "#4E5452" },
  { id: "dep-5", name: "Maintenance", ticketCount: 14, colour: "#642424" },
  {
    id: "dep-6",
    name: "Human Resourcing",
    ticketCount: 35,
    colour: "#1D1E33",
  },
  { id: "dep-7", name: "Events", ticketCount: 43, colour: "#E1CC4F" },
];

function App() {
  const [showChart, setChartStatus] = useState(true);

  const toggleChartStatus = () => {
    setChartStatus((state) => !state);
  };

  return (
    <div>
      <button className="toggle-visibility" onClick={toggleChartStatus}>
        {showChart ? "Hide the Chart" : "Show the Chart"}
      </button>
      <div className="chart-view">
        {showChart ? <InteractiveChart data={CHART_DATA} /> : null}
      </div>
    </div>
  );
}

export default App;
