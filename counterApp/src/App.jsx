import React, { useState } from 'react';
import './App.css'; 

const App = () => {
  const [count, setCount] = useState(0);
  const [customValue, setCustomValue] = useState(1);

  const increment = () => setCount(prevCount => prevCount + customValue);
  const decrement = () => setCount(prevCount => prevCount - customValue);
  const reset = () => setCount(0);

  const handleCustomValueChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setCustomValue(value);
    }
  };

  return (
    <div className="app-container">
      <div className="counter-container">
        <h1 className="heading">Value</h1>
        <h2 className="counter-value">{count}</h2>
      </div>
      <div className="button-group">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </div>
      <div className="custom-value">
        <label htmlFor="customValue">Custom Value: </label>
        <input
          id="customValue"
          type="number"
          value={customValue}
          onChange={handleCustomValueChange}
          min="1"
        />
      </div>
    </div>
  );
};

export default App;
