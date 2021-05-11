import { SelectorsObjectsArr } from "./index";

type SelectorsObjectToScssOptions = {
  includeModifiers: boolean;
};

export const selectorsObjectToScss = (
  selectorsObjectsArr: SelectorsObjectsArr,
  { includeModifiers }: SelectorsObjectToScssOptions
): string => {
  const getSelectors = (arr: SelectorsObjectsArr) => {
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
  const result = getSelectors(selectorsObjectsArr);
  return result;
};
