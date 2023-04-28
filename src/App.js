import './App.css';
import InputFormula from './components/InputFormula';

function App() {
  return (
    <div className="App">
      <InputFormula formula="3+4" />
      {/*
        Use the custom InputFormula component with a formula as a prop
        The formula uses the CONCAT function to combine the dollar sign
        with the formatted number resulting from the TEXT function
        The result will be displayed with 2 decimals 
      */}
      <InputFormula formula='"$ " & TEXT(123456, "#,##0.00")' />
      
    </div>
  );
}

export default App;
