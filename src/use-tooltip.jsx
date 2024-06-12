import { useState } from "react";

const Tooltip = ({ name, styles }) => {
  return (
    <div className="tooltip" style={styles}>
      {name}
    </div>
  );
};

const useToolTip = () => {
  const [element, setElement] = useState();

  const onMouseEnter = (data) => {
    const { name, value } = data;

    setElement(
      <Tooltip
        name={`${name}-${value}`}
        styles={{
          left: `${event.clientX}px`,
          top: `${event.clientY - 60}px`,
        }}
      />,
    );
  };

  const onMouseLeave = () => {
    setElement(null);
  };

  const obj = {
    enter: onMouseEnter,
    leave: onMouseLeave,
    tooltip: element,
  };

  return [obj.enter, obj.leave, obj.tooltip];
};

export default useToolTip;
1;
