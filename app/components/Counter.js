'use client';

import { useState, useEffect } from 'react';

export default function Counter({ initialValue = 1, min = 1, max = 10, onChange, disabled }) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => {
    if (count < max) {
      const newCount = count + 1;
      setCount(newCount);
      onChange(newCount);
    }
  };
  
  const decrement = () => {
    if (count > min) {
      const newCount = count - 1;
      setCount(newCount);
      onChange(newCount);
    }
  };
  
  useEffect(() => {
    setCount(initialValue);
  }, [initialValue]);

  return (
    <div className="counter">
      <button 
        className="counter-btn decrement" 
        onClick={decrement}
        disabled={disabled || count <= min}
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
        disabled={disabled || count >= max}
      >
        +
      </button>
    </div>
  );
}