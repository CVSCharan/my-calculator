"use client";
import { useState } from "react";
import styles from "./Calculator.module.css";

const Calculator: React.FC = () => {
  const [currentOperand, setCurrentOperand] = useState<string>("");
  const [previousOperand, setPreviousOperand] = useState<string>("");
  const [operation, setOperation] = useState<string | undefined>(undefined);

  const clear = () => {
    setCurrentOperand("");
    setPreviousOperand("");
    setOperation(undefined);
  };

  const deleteLast = () => {
    setCurrentOperand(currentOperand.slice(0, -1));
  };

  const appendNumber = (number: string) => {
    if (number === "." && currentOperand.includes(".")) return;
    setCurrentOperand(currentOperand + number);
  };

  const chooseOperation = (operation: string) => {
    if (currentOperand === "") return;
    if (previousOperand !== "") {
      compute();
    }
    setOperation(operation);
    setPreviousOperand(currentOperand);
    setCurrentOperand("");
  };

  const compute = () => {
    let computation: number;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    setCurrentOperand(computation.toString());
    setOperation(undefined);
    setPreviousOperand("");
  };

  const getDisplayNumber = (number: string) => {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  };

  return (
    <div className={styles.calculatorGrid}>
      <div className={styles.output}>
        <div className={styles.previousOperand}>
          {getDisplayNumber(previousOperand)} {operation}
        </div>
        <div className={styles.currentOperand}>
          {getDisplayNumber(currentOperand)}
        </div>
      </div>
      <button className={styles.spanTwo} onClick={clear}>
        AC
      </button>
      <button onClick={deleteLast}>DEL</button>
      <button onClick={() => chooseOperation("÷")}>÷</button>
      <button onClick={() => appendNumber("1")}>1</button>
      <button onClick={() => appendNumber("2")}>2</button>
      <button onClick={() => appendNumber("3")}>3</button>
      <button onClick={() => chooseOperation("*")}>*</button>
      <button onClick={() => appendNumber("4")}>4</button>
      <button onClick={() => appendNumber("5")}>5</button>
      <button onClick={() => appendNumber("6")}>6</button>
      <button onClick={() => chooseOperation("+")}>+</button>
      <button onClick={() => appendNumber("7")}>7</button>
      <button onClick={() => appendNumber("8")}>8</button>
      <button onClick={() => appendNumber("9")}>9</button>
      <button onClick={() => chooseOperation("-")}>-</button>
      <button onClick={() => appendNumber(".")}>.</button>
      <button onClick={() => appendNumber("0")}>0</button>
      <button className={styles.spanTwo} onClick={compute}>
        =
      </button>
    </div>
  );
};

export default Calculator;
