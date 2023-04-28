import React, { useState, useEffect } from 'react';
import { Parser } from 'hot-formula-parser';

const InputFormula = ({ formula }) => {
  // Declare a state variable to hold the result of the formula
  const [valueFromFormula, setValueFromFormula] = useState('');

  // Use the useEffect hook to evaluate the formula whenever it changes
  useEffect(() => {
    // Create a new instance of the Parser
    const parser = new Parser();

    // Register custom functions to handle CONCAT, FIXED, and TEXT functions
    parser.on('callFunction', (name, params, done) => {
      if (name === 'CONCAT') {
        const concatenated = params.join('');
        done(concatenated);
        return;
      }

      if (name === 'FIXED') {
        const [number, decimals] = params;
        const formattedNumber = parseFloat(number).toFixed(decimals);
        done(formattedNumber);
        return;
      }

      if (name === 'TEXT') {
        const [number, format] = params;
        const formattedNumber = new Intl.NumberFormat('en-US', {
          minimumFractionDigits: format.split('.')[1].length,
          maximumFractionDigits: format.split('.')[1].length,
          useGrouping: format.includes(','),
        }).format(number);
        done(formattedNumber);
        return;
      }

      done(new Error('Function not implemented'));
    });

    // Parse and evaluate the formula
    const result = parser.parse(formula);

    // If there's an error (e.g., invalid formula), set valueFromFormula to the original formula
    if (result.error) {
      setValueFromFormula(formula);
    } else {
      // Otherwise, set valueFromFormula to the result of the evaluated formula
      setValueFromFormula(result.result);
    }
  }, [formula]);

  // Render the component, displaying the formula and its result
  return (
    <div>
      <p>Formula: {formula}</p>
      <p>Result: {valueFromFormula}</p>
    </div>
  );
};

export default InputFormula;
