import React, { useState } from "react";
import { Typography } from "@material-ui/core";

const Counter = ({ title, count }) => {
  const [currentCount, setCurrentCount] = useState(count);

  const handleIncrement = () => {
    setCurrentCount(currentCount + 1);
  };

  const handleDecrement = () => {
    setCurrentCount(currentCount - 1);
  };

  return (
    <div>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="h2">{currentCount}</Typography>
      <div>
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
      </div>
    </div>
  );
};

export default Counter;