import { useState } from "react";

const useBarChart = ({ height }) => {
  const [nheight, setNewHeight] = useState(0);

  setTimeout(() => {
    setNewHeight(height);
  }, 100);

  return [nheight];
};

export default useBarChart;
