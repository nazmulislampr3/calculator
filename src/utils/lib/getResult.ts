import {
  pAllowAtFirst,
  pAllowAtLast,
  pNumber,
  pOperators,
  pOperators1,
  pOperators2,
} from "./patterns";
import rx from "./rx";

const operators = ["÷", "×", "-", "+"];
const getResult = (numbers: string, operatorIndex: undefined | number = 0) => {
  if (!!numbers) {
    if (!rx(pAllowAtFirst).test(numbers[0])) {
      return getResult(numbers.substring(1));
    }
    if (!rx(pAllowAtLast).test(numbers[numbers.length - 1])) {
      return getResult(numbers.substring(0, numbers.length - 1));
    }
    const p1 = /(\+-)|(-\+)/g;
    if (p1.test(numbers)) {
      numbers = numbers.replace(p1, "-");
      return getResult(numbers);
    }

    const p2 = /(--)|(\+\+)/g;
    if (p1.test(numbers)) {
      numbers = numbers.replace(p2, "+");
      return getResult(numbers);
    }

    if (/\(/.test(numbers)) {
      const p4 = rx("(\\d|%)\\(");
      if (p4.test(numbers)) {
        const chunk = numbers.match(p4)?.[0]!;
        const replaceChunk = chunk.replace("(", "×(");
        numbers = numbers.replace(chunk, replaceChunk);
        return getResult(numbers);
      }

      const p3 = rx("\\)%+");
      if (p3.test(numbers)) {
        const chunk = numbers.match(p3)?.[0]!;
        const replaceChunk = chunk.replace("%", "×0.01");
        numbers = numbers.replace(chunk, replaceChunk);
        return getResult(numbers);
      }

      const p2 = rx(`\\)(${pNumber}%+)`);
      if (p2.test(numbers)) {
        const chunk = numbers.match(p2)?.[0]!;
        const replaceChunk = chunk.replace(")", ")×");
        numbers = numbers.replace(chunk, replaceChunk);
        return getResult(numbers);
      }

      const p1 = /\(([^()]*)\)?/g;
      if (p1.test(numbers)) {
        const chunk = numbers.match(p1)?.pop()!;
        const lastBracket = chunk[chunk.length - 1] === ")";
        let slicedChunk = chunk?.substring(
          1,
          lastBracket ? chunk.length - 1 : chunk.length
        );
        const value = getResult(slicedChunk);
        numbers = numbers.replace(chunk, value);
        return getResult(numbers);
      }
    }
    if (/%/.test(numbers)) {
      const p5 = rx(`%+(${pOperators1})`);
      if (p5.test(numbers)) {
        const chunk = numbers.match(p5)?.[0]!;
        const replaceChunk = chunk.replace(/%/g, `×0.01`);
        numbers = numbers.replace(chunk, replaceChunk);
        return getResult(numbers);
      }

      const p4 = rx(`%(${pNumber}|\\()`);
      if (p4.test(numbers)) {
        const chunk = numbers.match(p4)?.[0]!;
        const replaceChunk = chunk.replace("%", "%×");
        numbers = numbers.replace(chunk, replaceChunk);
        return getResult(numbers);
      }

      const p1 = rx(`(((^|×)${pNumber}%+)|(${pOperators2}|×)${pNumber}%%+)`);
      if (p1.test(numbers)) {
        const chunk = numbers.match(p1)?.[0]!;
        const replacedChunk = chunk.replace(/%/g, "×0.01");
        numbers = numbers.replace(chunk, replacedChunk);
        return getResult(numbers);
      }

      const p2 = rx(`÷${pNumber}%+`);
      if (p2.test(numbers)) {
        const chunk = numbers.match(p2)?.[0]!;
        const replacedChunk = chunk.replace(/%/g, "÷0.01");
        numbers = numbers.replace(chunk, replacedChunk);
        return getResult(numbers);
      }

      const p3 = rx(`.[^%]+${pNumber}%`);
      if (p3.test(numbers)) {
        const p4 = rx(`.+(?=${pOperators}${pNumber}%)`);
        let chunk = numbers.match(p3)?.[0]!;
        let chunk2 = chunk.match(p4)?.[0]!;

        const value = getResult(chunk2);
        let replaceChunk = chunk
          .replace(chunk2, value)
          .replace("%", `×0.01×${value}`);
        numbers = numbers.replace(chunk, replaceChunk);
        return getResult(numbers);
      }
    }

    const operator = operators[operatorIndex];

    if (operator) {
      const part1 = `-?${pNumber}`;
      const part2 = operator === "+" ? "\\+" : operator;
      const part3 = pNumber;
      const p = rx(`${part1}${part2}-?${part3}`);

      if (p.test(numbers)) {
        const chunk = numbers.match(p)?.[0]!;
        const firstMinus = chunk?.[0] === "-";

        let [num1, num2]: (string | number)[] = chunk
          .split(operator)
          .filter((item) => !!item);

        if (num1 == "" || num2 === "") {
          return numbers;
        }
        num1 = Number(num1);
        num2 = Number(num2);

        num1 = firstMinus && operator === "-" ? -num1 : num1;

        const value = `+${String(
          operator === "÷"
            ? num1 / num2
            : operator === "×"
            ? num1 * num2
            : operator === "-"
            ? num1 - num2
            : num1 + num2
        )}`;

        numbers = numbers.replace(chunk, value);
        return getResult(numbers);
      } else {
        operatorIndex++;
        return getResult(numbers, operatorIndex);
      }
    }
  }
  return numbers;
};
export default getResult;
