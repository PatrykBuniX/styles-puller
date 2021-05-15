import { ElementsArr } from "./index";

type ElementsArrToScssOptions = {
  includeModifiers: boolean;
};

export const elementsArrToScss = (
  elementsArr: ElementsArr,
  { includeModifiers }: ElementsArrToScssOptions
): string => {
  const getSelectors = (arr: ElementsArr) => {
    let currentElement = "";
    arr.forEach((item) => {
      const { selector, modifiers, children } = item;
      if (includeModifiers && modifiers.length > 0) {
        const childSelectors = getSelectors(children);
        const modifiersString = modifiers
          .map((m) => {
            return `&${m}{${childSelectors}}`;
          })
          .join("");
        currentElement += `${selector}{${childSelectors}${modifiersString}}`;
      } else {
        const childSelectors = getSelectors(children);
        currentElement += `${selector}{${childSelectors}}`;
      }
    });
    return currentElement;
  };
  const result = getSelectors(elementsArr);
  return result;
};
