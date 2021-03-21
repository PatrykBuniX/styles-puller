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
  children: SelectorsObjectsArr;
}[];

const htmlToObject = (htmlString: string): SelectorsObjectsArr => {
  function addSelectors(nodes: NodeListOf<ChildNode>): SelectorsObjectsArr {
    return Array.from(nodes).reduce<SelectorsObjectsArr>((acc, node) => {
      if (!isHTMLElement(node)) return acc;
      const { classList, tagName } = node;
      const selector = classList.value
        ? `${classList.value
            .split(" ")
            .map((c) => `.${c}`)
            .join("")}`
        : tagName.toLowerCase();
      const children = addSelectors(node.childNodes);
      acc.push({
        selector,
        children: children ? children : [],
      });
      return acc;
    }, []);
  }
  const nodeElement = createElementFromHTML(htmlString);
  const selectorsObjectArr = addSelectors(nodeElement);
  const merged = mergeDuplicates(selectorsObjectArr);
  return merged;
};

const selectorsObjectToScss = (
  selectorsObjectsArr: SelectorsObjectsArr
): string => {
  const getSelectors = (arr: SelectorsObjectsArr) => {
    let currentElement = "";
    arr.forEach((item) => {
      const selectors = item.selector.split(".");
      selectors.shift();
      if (selectors.length > 1) {
        const childSelectors = getSelectors(item.children);
        currentElement += `.${selectors[0]}{${childSelectors}}`;
        currentElement += `.${selectors[0]}{&.${selectors[1]}{${childSelectors}}}`;
      } else {
        const childSelectors = getSelectors(item.children);
        currentElement += item.selector + "{" + childSelectors + "}";
      }
    });
    return currentElement;
  };
  const result = getSelectors(selectorsObjectsArr);
  console.log(result);
  return result;
};

export const htmlStringToScss = (htmlString: string): string => {
  const selectorsObject = htmlToObject(htmlString);
  return selectorsObjectToScss(selectorsObject);
};

const testArray = [
  {
    s: "me",
    child: [
      { s: "me-child", child: [{ s: "meme", child: [] }] },
      { s: "me-child", child: [{ s: "meme2", child: [] }] },
      { s: "me-child", child: [{ s: "meme3", child: [] }] },
    ],
  },
  { s: "you", child: [{ s: "you-child", child: [] }] },
  { s: "me", child: [{ s: "me-2nd-child", child: [] }] },
  { s: "me", child: [{ s: "me-3rd-child", child: [] }] },
  { s: "she", child: [{ s: "she-child", child: [] }] },
];

function mergeDuplicates(arr: SelectorsObjectsArr): SelectorsObjectsArr {
  const newArray: SelectorsObjectsArr = [];
  arr.forEach((item, i, self) => {
    const duplicates = self.filter((o) => item.selector === o.selector);
    //mege duplicated objects
    const allChildren: SelectorsObjectsArr = [];
    duplicates.forEach((d) => {
      allChildren.push(...d.children);
    });
    const newElement = {
      selector: duplicates[0].selector,
      children: mergeDuplicates(allChildren),
    };
    if (!newArray.find((el) => el.selector === newElement.selector)) {
      newArray.push(newElement);
    }
  });
  return newArray;
}
