import { htmlToElementsArr } from "./htmlToElementsArr";
import { elementsArrToScss } from "./elementsArrToScss";
import { elementsArrToCss } from "./elementsArrToCss";
import { mergeDuplicates } from "./mergeDuplicates";

export type ElementsArr = {
  selector: string;
  modifiers: string[];
  children: ElementsArr;
}[];

export type HtmlStringToStylesOptions = {
  includeModifiers: boolean;
  mode: "css" | "scss";
  tagNamesOnly: boolean;
};
const htmlStringToStylesOptionsDefaults = {
  includeModifiers: true,
  mode: "scss" as const,
  tagNamesOnly: false,
};

export const htmlStringToStyles = (
  htmlString: string,
  {
    includeModifiers,
    mode,
    tagNamesOnly,
  }: HtmlStringToStylesOptions = htmlStringToStylesOptionsDefaults
): string => {
  const elementsArr = htmlToElementsArr(htmlString, { tagNamesOnly });
  const mergedElementsArr = mergeDuplicates(elementsArr);
  switch (mode) {
    case "scss":
      return elementsArrToScss(mergedElementsArr, { includeModifiers });

    case "css":
      return elementsArrToCss(mergedElementsArr, { includeModifiers });

    default:
      throw new Error(`Mode ${mode} is not supported!`);
  }
};
