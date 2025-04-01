'use client';

import { useState } from 'react';

export default function Counter({ initialValue = 1, min = 1, max = 10 }) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => {
    if (count < max) {
      setCount(count + 1);
    }
  };
  
  const decrement = () => {
    if (count > min) {
      setCount(count - 1);
    }
  };
  
  return (
    <div className="counter">
      <button 
        className="counter-btn decrement" 
        onClick={decrement}
        disabled={count <= min}
      >
        -
      </button>
      
      <input 
        type="number" 
        className="counter-input" 
        value={count}
        readOnly
        min={min}
        max={max}
      />
      
      <button 
        className="counter-btn increment" 
        onClick={increment}
        disabled={count >= max}
      >
        +
      </button>
    </div>
  );
}