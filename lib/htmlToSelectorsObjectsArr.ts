import { SelectorsObjectsArr } from "./index";

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

export const htmlToSelectorsObjectsArr = (
  htmlString: string
): SelectorsObjectsArr => {
  function addSelectors(nodes: NodeListOf<ChildNode>): SelectorsObjectsArr {
    return Array.from(nodes).reduce<SelectorsObjectsArr>((acc, node) => {
      if (!isHTMLElement(node)) return acc;
      const { classList, tagName } = node;

      let selector = tagName.toLowerCase();
      let modifiers: string[] = [];
      if (classList.value) {
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
  const selectorsObjectArr = addSelectors(nodeElement);
  return selectorsObjectArr;
};
