import { useReducer, useState } from "react";
import DigitButton from "./components/DIgitButoon";
import OperationButton from "./components/OperationButton";
import styles from "./assets/main.module.css";

export const ACTION = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTION.ADD_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          currentOperand:payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") return state;

      if (payload.digit === "." && state.currentOperand?.includes(".")) return state;
        

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTION.CHOOSE_OPERATION:

      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if(state.currentOperand == null){
        return{
          ...state,
          operation:payload.operation,

        }
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };




    case ACTION.CLEAR:
      return {};

    case ACTION.DELETE_DIGIT:

    if(state.overwrite){
      return{
        ...state,
        overwrite:false,
        currentOperand:null

      }

    }

    if(state.currentOperand == null ) return state
    if(state.currentOperand.length === 1){
      return{...state, currentOperand:null}
    }

    return{
      ...state,
      currentOperand:state.currentOperand.slice(0,-1)

    }
    case ACTION.EVALUATE:
      if(state.operation == null || state.currentOperand == null || state.previousOperand == null){
        return state
      }

      return{
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state)
      }
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return "";

  let compuataion = "";

  switch (operation) {
    case "+":
      compuataion = prev + current;
      break;

    case "-":
      compuataion = prev - current;

      break;

    case "x":
      compuataion = prev * current;

      break;

    case "÷":

      compuataion = prev / current;

      break;
    
  }

  return compuataion.toString()
}

function App() {
  const [{ currentOperand, previousOperand, operation }, disptach] = useReducer(
    reducer,
    {}
  );


  return (
    <div className={styles.calculatorgrid}>
      <div className={styles.output}>
        <div className={styles.previousoperand}>
          {previousOperand} {operation}
        </div>
        <div className={styles.currentoperand}>{currentOperand}</div>
      </div>
      <button
        className={styles.spantwo}
        onClick={() => disptach({ type: ACTION.CLEAR })}
      >
        AC
      </button>
      <button onClick={()=> disptach({type:ACTION.DELETE_DIGIT})}>DEL</button>
      <OperationButton operation="÷" dispatch={disptach} />
      <DigitButton digit="7" dispatch={disptach} />
      <DigitButton digit="8" dispatch={disptach} />
      <DigitButton digit="9" dispatch={disptach} />
      <OperationButton operation="x" dispatch={disptach} />
      <DigitButton digit="4" dispatch={disptach} />
      <DigitButton digit="5" dispatch={disptach} />
      <DigitButton digit="6" dispatch={disptach} />
      <OperationButton operation="-" dispatch={disptach} />
      <DigitButton digit="1" dispatch={disptach} />
      <DigitButton digit="2" dispatch={disptach} />
      <DigitButton digit="3" dispatch={disptach} />
      <OperationButton operation="+" dispatch={disptach} />
      <DigitButton digit="0" dispatch={disptach} />
      <DigitButton digit="." dispatch={disptach} />
      <button
        className={styles.spantwo}
        onClick={() => disptach({ type: ACTION.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
