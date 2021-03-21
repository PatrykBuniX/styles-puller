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
  console.time("merge");
  const merged = mergeDuplicates(selectorsObjectArr);
  console.timeEnd("merge");
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

function mergeDuplicates(arr: SelectorsObjectsArr): SelectorsObjectsArr {
  return arr.reduce<SelectorsObjectsArr>((acc, curr, i, self) => {
    if (acc.find((el) => el.selector === curr.selector)) return acc; //if object already merged - skip
    const duplicates = self.filter((o) => curr.selector === o.selector);

    //merge same selectors children to one array
    const allChildren: SelectorsObjectsArr = [];
    duplicates.forEach((d) => {
      allChildren.push(...d.children);
    });

    //create merged object and merge its children the same way
    const newElement = {
      selector: duplicates[0].selector,
      children: mergeDuplicates(allChildren),
    };
    acc.push(newElement);
    return acc;
  }, []);
}
