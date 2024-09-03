import { ReactNode, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { Func1, HandleInput, Inputs } from "../types";
import getResult from "../utils/lib/getResult";
import rx from "../utils/lib/rx";
import {
  pAllowAfterDot,
  pAllowAtFirst,
  pAllowBeforeBracket2,
  pAllowBeforePercent,
  pOperators,
  pOperators1,
  pOperators2,
} from "../utils/lib/patterns";

const calculatorContext = createContext<{
  inputs: Inputs;
  output: string;
  handleInput: HandleInput;
  deleteInput: Func1;
  evaluate: Func1;
  clear: Func1;
  inputText: string;
} | null>(null);

const CalculatorContextProvider = ({ children }: { children: ReactNode }) => {
  const [inputs, setInputs] = useState<Inputs>([
    "4",
    "0",
    "+",
    "1",
    "0",
    "%",
    "%",
    "(",
    "3",
    "0",
    "-",
    "2",
    "0",
    ")",
    "+",
    "1",
    "0",
    "+",
    "2",
    "0",
    ".",
    "0",
    "1",
    "+",
    "(",
    "5",
    "0",
    "+",
    "7",
    "0",
    "(",
    "9",
    "0",
    "+",
    "4",
    "0",
    ")",
    ")",
    "%",
  ]);
  // const inputText = inputs.join("");
  const inputText = "46+982×-81×-6+86";
  let outputResult = getResult(inputText);
  const output = outputResult || "";

  const { length } = inputs;
  const lastIndex = length - 1;
  let rear = inputs[inputs.length - 1];
  const prevRear = inputs[inputs.length - 2];
  const currentNumber = inputText.match(rx(`\\d+(\\.|\\.\\d+)?$`))?.[0]!;
  const operators = rx(pOperators);
  const operators1 = rx(pOperators1);
  const operators2 = rx(pOperators2);
  const handleInput: HandleInput = (value: string) => {
    let inputValues = [...inputs];
    if (!rear) {
      if (Number(value) === 0) {
        inputValues.push("0");
      } else if (value === ".") {
        inputValues = [...inputValues, "0", "."];
      } else if (rx(pAllowAtFirst).test(value)) {
        inputValues.push(value);
      }
    } else {
      if (rear === ".") {
        if (!rx(pAllowAfterDot).test(value)) {
          inputValues.pop();
          setInputs(inputValues);
          rear = inputs[lastIndex - 1];
        }
      }
      if (value === ".") {
        if (!!currentNumber) {
          if (!currentNumber.includes(".")) {
            inputValues.push(value);
          }
        } else {
          inputValues = [...inputValues, "0", "."];
        }
      } else if (Number(value) === 0) {
        if (!!currentNumber) {
          if (Number(currentNumber) !== 0) {
            inputValues.push(value);
          }
        } else {
          inputValues.push("0");
        }
      } else if (value === "(") {
        inputValues.push(value);
      } else if (value === ")") {
        const bracket1Length = inputValues.filter(
          (item) => item === "("
        ).length;
        const bracket2Length = inputValues.filter(
          (item) => item === ")"
        ).length;
        if (bracket1Length > bracket2Length) {
          if (rear !== "(") {
            if (!rx(pAllowBeforeBracket2).test(rear)) {
              inputValues.pop();
            }
            inputValues.push(value);
          }
        }
      } else if (operators.test(value)) {
        if (operators.test(rear)) {
          if (operators1.test(rear)) {
            if (operators2.test(value)) {
              if (value === "-") {
                inputValues.push(value);
              }
            } else {
              inputValues.pop();
              inputValues.push(value);
            }
          } else {
            if (!operators.test(prevRear)) {
              inputValues.pop();
              inputValues.push(value);
            }
          }
        } else {
          inputValues.push(value);
        }
      } else if (value === "%") {
        if (rx(pAllowBeforePercent).test(rear)) {
          inputValues.push(value);
        }
      } else {
        inputValues.push(value);
      }
    }

    setInputs(inputValues);
  };

  const deleteInput: Func1 = () => {
    setInputs((prev) => {
      const copy = [...prev];
      copy.pop();
      return copy;
    });
  };

  const evaluate: Func1 = () => {
    setInputs([outputResult]);
  };

  console.table({ result: getResult(inputText) });

  const clear: Func1 = () => setInputs([]);

  return (
    <calculatorContext.Provider
      value={{
        inputs,
        output,
        clear,
        deleteInput,
        evaluate,
        handleInput,
        inputText,
      }}
    >
      {children}
    </calculatorContext.Provider>
  );
};
export default CalculatorContextProvider;

export const useCalculator = () =>
  useContextSelector(calculatorContext, (state) => state);
