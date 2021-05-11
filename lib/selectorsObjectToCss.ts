import { SelectorsObjectsArr } from "./index";

type SelectorsObjectToCssOptions = {
  includeModifiers: boolean;
};

export const selectorsObjectToCss = (
  selectorsObjectsArr: SelectorsObjectsArr,
  { includeModifiers }: SelectorsObjectToCssOptions
): any => {
  const getSelectors = (arr: SelectorsObjectsArr, currentElement: string) => {
    let cssString = "";
    arr.forEach((element) => {
      const { selector, children, modifiers } = element;
      if (includeModifiers && modifiers.length > 0) {
        cssString += `${currentElement}${selector}{}`;
        cssString += getSelectors(children, `${currentElement}${selector}>`);
        modifiers.forEach((modifier) => {
          cssString += `${currentElement}${selector}${modifier}{}`;
          cssString += getSelectors(
            children,
            `${currentElement}${selector}${modifier}>`
          );
        });
      } else {
        cssString += `${currentElement}${selector}{}`;
        cssString += getSelectors(children, `${currentElement}${selector}>`);
      }
    });
    return cssString;
  };
  return getSelectors(selectorsObjectsArr, "");
};
