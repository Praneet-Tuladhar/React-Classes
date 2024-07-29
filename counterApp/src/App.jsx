import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [count, setCount] = useState(0);
  const [customValue, setCustomValue] = useState(1);

  // Handle custom value input change
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
        
      </div>
      <div className="button-group">
        <button onClick={() => setCount(count + 1)}>+</button>
        <h2 className="counter-value">{count}</h2>
        <button onClick={() => setCount(count - 1)}>-</button>
        </div>
 <h2>Custom Value:  </h2>
      <div className="custom-value">
      <button onClick={() => setCount(count + customValue)}>+</button>
       
        <input
          id="customValue"
          type="number"
          value={customValue}
          onChange={handleCustomValueChange}
          min="1"
        />
        <button onClick={() => setCount(count - customValue)}>-</button>
      
        
      </div>
      <br />
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
};

export default App;
