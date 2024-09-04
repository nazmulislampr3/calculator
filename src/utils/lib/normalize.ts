import { pAllowAtFirst, pAllowAtLast } from "./patterns";
import rx from "./rx";

const normalize = (inputText: string): string => {
  if (!inputText) {
    return inputText;
  }
  if (!rx(pAllowAtFirst).test(inputText[0])) {
    return normalize(inputText.substring(1));
  }

  if (!rx(pAllowAtLast).test(inputText[inputText.length - 1])) {
    return normalize(inputText.substring(0, inputText.length - 1));
  }

  return inputText;
};

export default normalize;
