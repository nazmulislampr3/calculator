import { pNumber } from "./patterns";
import rx from "./rx";

const showInputPattern = rx(`${pNumber}[^\\d\\.]`);
const showResult = (inputTxt: string): boolean =>
  showInputPattern.test(inputTxt);

export default showResult;
