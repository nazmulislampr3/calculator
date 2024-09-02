import { useCalculator } from "../context/CalculatorContext";

const Output = () => {
  const { output, inputText } = useCalculator()!;
  return (
    <div className="h-full glass-bg-2 flex justify-center items-end flex-col gap-5 px-5 py-2">
      <div className="font-bold text-slate-100 text-2xl sm:text-4xl text-right break-words text-wrap">
        {inputText}
      </div>
      <div className="font-bold text-slate-300 text-xl sm:text-2xl">
        {output}
      </div>
    </div>
  );
};

export default Output;
