import Input from "./Input";
import Output from "./Output";

const Calculator = () => {
  return (
    <div
      className="w-full max-w-lg flex flex-col overflow-hidden"
      style={{
        aspectRatio: "1/1.6",
      }}
    >
      <Output />
      <Input />
    </div>
  );
};

export default Calculator;
