import React, { useState, useEffect } from 'react';
import { Parser } from 'hot-formula-parser';

const InputFormula = ({ formula }) => {
  const [valueFromFormula, setValueFromFormula] = useState('');

  useEffect(() => {
    const parser = new Parser();
    const result = parser.parse(formula);
    
    if (result.error) {
      setValueFromFormula(formula);
    } else {
      setValueFromFormula(result.result);
    }
  }, [formula]);

  return (
    <div>
      <p>Formula: {formula}</p>
      <p>Result: {valueFromFormula}</p>
    </div>
  );
};

export default InputFormula;
