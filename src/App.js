import React, { useState } from 'react';
import './App.css';
import { evaluate } from 'mathjs';

const App = () => {
  const [input, setinput] = useState('');

  const handleclear = () => {
    setinput('');
  };

  const handledelete = () => {
    setinput(input.slice(0, -1));
  };

const handleclick = (value) => {
  if (value === '%') {
    // Find the last operator in the input
    const operators = ['+', '-', '*', '/'];
    const lastOperatorIndex = input.split('').reverse().findIndex((char) => operators.includes(char));

    if (lastOperatorIndex === -1 || lastOperatorIndex === input.length - 1) {
      // Invalid state: No operator or no number after the operator
      setinput('Error');
      return;
    }

    const operatorIndex = input.length - 1 - lastOperatorIndex;
    const operator = input[operatorIndex];

    // Parse the numbers before and after the operator
    const numberBeforeOperator = parseFloat(input.slice(0, operatorIndex));
    const numberAfterOperator = parseFloat(input.slice(operatorIndex + 1));

    if (isNaN(numberBeforeOperator) || isNaN(numberAfterOperator)) {
      // Invalid numbers
      setinput('Error');
      return;
    }

    // Calculate the percentage based on the operator
    let result;
    if (operator === '+') result = numberBeforeOperator + (numberBeforeOperator * (numberAfterOperator / 100));
    else if (operator === '-') result = numberBeforeOperator - (numberBeforeOperator * (numberAfterOperator / 100));
    else if (operator === '*') result = numberBeforeOperator * (numberAfterOperator / 100);
    else if (operator === '/') result = numberBeforeOperator / (numberAfterOperator / 100);

    // Update the input with the result
    if (result !== undefined) {
      setinput(result.toString());
    } else {
      setinput('Error');
    }
  } else {
    setinput(input + value); // Append the clicked value
  }
};


const handlecalculate = () => {
  try {
    setinput(evaluate(input).toString());
  } catch (error) {
    setinput('Error');
  }
};
  

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="calculator-display">
          <input type="text" value={input} readOnly />
        </div>
        <div className="calculator-buttons">
          <button onClick={() => handleclick('7')}>7</button>
          <button onClick={() => handleclick('8')}>8</button>
          <button onClick={() => handleclick('9')}>9</button>
          <button onClick={() => handleclick('/')}>/</button>
          <button onClick={() => handleclick('4')}>4</button>
          <button onClick={() => handleclick('5')}>5</button>
          <button onClick={() => handleclick('6')}>6</button>
          <button onClick={() => handleclick('*')}>*</button>
          <button onClick={() => handleclick('1')}>1</button>
          <button onClick={() => handleclick('2')}>2</button>
          <button onClick={() => handleclick('3')}>3</button>
          <button onClick={() => handleclick('-')}>-</button>
          <button onClick={() => handleclick('0')}>0</button>
          <button onClick={() => handleclick('.')}>.</button>
          <button onClick={() => handleclick('%')}>%</button>
          <button onClick={() => handleclick('+')}>+</button>
          <button className="special-button clear" onClick={handleclear}>C</button>
          <button className="special-button delete" onClick={handledelete}>DEL</button>
          <button className="special-button equal" onClick={handlecalculate}>=</button>
        </div>
      </div>
    </div>
  );
};

export default App;
