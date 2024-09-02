import { useCalculator } from "../context/CalculatorContext";
import Button from "./Button";

const Input = () => {
  const { clear, deleteInput, evaluate, handleInput } = useCalculator()!;
  return (
    <div className="glass-bg grid grid-cols-4">
      <Button action={() => clear()} key={"ac"} className="btn2">
        AC
      </Button>
      <Button action={() => deleteInput()} key={"DEL"} className="btn2">
        DEL
      </Button>
      <div className="col-span-3 grid grid-cols-3">
        {[
          "(",
          ")",
          "%",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "00",
          "0",
          ".",
        ].map((value) => (
          <Button key={value} action={() => handleInput(value)}>
            {value}
          </Button>
        ))}
      </div>
      <div className="col-span-1 grid grid-cols-1">
        {["÷", "×", "-", "+"].map((value) => (
          <Button key={value} action={() => handleInput(value)}>
            {value}
          </Button>
        ))}
        <Button action={() => evaluate()}>=</Button>
      </div>
    </div>
  );
};

export default Input;
