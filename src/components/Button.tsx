import { Func1 } from "../types";
import cn from "../utils/lib/cn";

type ButtonType = {
  action: Func1;
} & JSX.IntrinsicElements["button"];

const Button = ({ children, className, action, ...props }: ButtonType) => {
  return (
    <button
      className={cn(
        "border-2 border-gray-400 font-bold text-3xl sm:text-5xl text-slate-300 aspect-[4_/_3] active:bg-slate-800 transition-all",
        className
      )}
      {...props}
      onClick={() => action()}
    >
      {children}
    </button>
  );
};

export default Button;
