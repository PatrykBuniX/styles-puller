const createElementFromHTML = (htmlString: string) => {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.childNodes;
};

const isHTMLElement = (node: ChildNode): node is HTMLElement => {
  return (
    node.nodeType === Node.ELEMENT_NODE && !(node instanceof HTMLScriptElement)
  );
};

type SelectorsObjectsArr = {
  selector: string;
  modifiers: string[];
  children: SelectorsObjectsArr;
}[];

const htmlToSelectorsObjectsArr = (htmlString: string): SelectorsObjectsArr => {
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

type SelectorsObjectToScssOptions = {
  includeModifiers: boolean;
};

const selectorsObjectToScss = (
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
        currentElement += `${selector}{${childSelectors} ${modifiersString}}`;
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

export type HtmlStringToScssOptions = { includeModifiers: boolean };
const htmlStringToScssOptionsDefaults = { includeModifiers: true };

export const htmlStringToScss = (
  htmlString: string,
  {
    includeModifiers,
  }: HtmlStringToScssOptions = htmlStringToScssOptionsDefaults
): string => {
  const selectorsObjectArr = htmlToSelectorsObjectsArr(htmlString);
  const merged = mergeDuplicates(selectorsObjectArr);
  return selectorsObjectToScss(merged, { includeModifiers });
};

function mergeDuplicates(arr: SelectorsObjectsArr): SelectorsObjectsArr {
  return arr.reduce<SelectorsObjectsArr>((acc, curr, i, self) => {
    if (acc.find((el) => el.selector === curr.selector)) return acc; //if object already merged - skip
    const duplicates = self.filter((o) => curr.selector === o.selector);

    //merge same selectors children to one array
    const allChildren: SelectorsObjectsArr = [];
    duplicates.forEach((d) => {
      allChildren.push(...d.children);
    });

    //merge all modifiers to one array
    const allModifiers: string[] = [];
    duplicates.forEach((d) => {
      d.modifiers.forEach((m) => {
        if (!allModifiers.includes(m)) {
          allModifiers.push(m);
        }
      });
    });

    //create merged object and merge its children the same way
    const newElement = {
      selector: duplicates[0].selector,
      modifiers: allModifiers,
      children: mergeDuplicates(allChildren),
    };
    acc.push(newElement);
    return acc;
  }, []);
}
