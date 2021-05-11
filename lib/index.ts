import { htmlToSelectorsObjectsArr } from "./htmlToSelectorsObjectsArr";
import { selectorsObjectToScss } from "./selectorsObjectToScss";
import { selectorsObjectToCss } from "./selectorsObjectToCss";
import { mergeDuplicates } from "./mergeDuplicates";

export type SelectorsObjectsArr = {
  selector: string;
  modifiers: string[];
  children: SelectorsObjectsArr;
}[];

export type HtmlStringToStylesOptions = {
  includeModifiers: boolean;
  mode: "css" | "scss";
};
const htmlStringToStylesOptionsDefaults = {
  includeModifiers: true,
  mode: "scss" as const,
};

export const htmlStringToStyles = (
  htmlString: string,
  {
    includeModifiers,
    mode,
  }: HtmlStringToStylesOptions = htmlStringToStylesOptionsDefaults
): string => {
  const selectorsObjectArr = htmlToSelectorsObjectsArr(htmlString);
  const merged = mergeDuplicates(selectorsObjectArr);
  switch (mode) {
    case "scss":
      return selectorsObjectToScss(merged, { includeModifiers });

    case "css":
      return selectorsObjectToCss(merged, { includeModifiers });

    default:
      throw new Error(`Mode ${mode} is not supported!`);
  }
};
