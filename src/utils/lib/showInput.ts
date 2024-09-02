import { pOperators } from "./patterns";
import rx from "./rx";

const showInput = (inputs: string[]): boolean => {
  if (inputs.includes("%")) {
    return true;
  }

  if (inputs.length > 1) {
    const operatorIndex = inputs.findIndex(
      (item, index) => index > 0 && rx(pOperators).test(item)
    );
    if (operatorIndex > 0 && inputs.length > operatorIndex + 1) {
      return true;
    }
  }

  return false;
};

export default showInput;
