import { ElementsArr } from "./index";

export const createElementFromHTML = (htmlString: string) => {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.childNodes;
};

const isHTMLElement = (node: ChildNode): node is HTMLElement => {
  return (
    node.nodeType === Node.ELEMENT_NODE && !(node instanceof HTMLScriptElement)
  );
};

type HtmlToElementsArrOptions = {
  tagNamesOnly: boolean;
};

export const htmlToElementsArr = (
  htmlString: string,
  { tagNamesOnly }: HtmlToElementsArrOptions = { tagNamesOnly: false }
): ElementsArr => {
  function addSelectors(nodes: NodeListOf<ChildNode>): ElementsArr {
    return Array.from(nodes).reduce<ElementsArr>((acc, node) => {
      if (!isHTMLElement(node)) return acc;
      const { classList, tagName } = node;

      let selector = tagName.toLowerCase();
      let modifiers: string[] = [];
      if (classList.value && !tagNamesOnly) {
        const classNamesArr = classList.value
          .split(" ")
          .filter((v) => !!v)
          .map((v) => `.${v}`);
        selector = classNamesArr.shift()!;
        modifiers = classNamesArr;
      }
      const children = addSelectors(node.childNodes);
      acc.push({
        selector,
        modifiers,
        children,
      });
      return acc;
    }, []);
  }
  const nodeElement = createElementFromHTML(htmlString);
  const elementsArr = addSelectors(nodeElement);
  return elementsArr;
};
