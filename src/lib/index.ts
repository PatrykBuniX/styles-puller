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

type SelectorsObject = { [k: string]: any };

const htmlToObject = (htmlString: string): SelectorsObject => {
  function addSelectors(nodes: NodeListOf<ChildNode>): SelectorsObject {
    return Array.from(nodes).reduce(
      (acc: SelectorsObject, node: ChildNode, i) => {
        if (!isHTMLElement(node)) {
          return acc;
        }
        const { classList, tagName } = node;

        const nextField = classList.value
          ? `${classList.value
              .split(" ")
              .map((c) => `.${c}`)
              .join("")}`
          : tagName.toLowerCase();

        acc[nextField] = addSelectors(node.childNodes);
        return acc;
      },
      {}
    );
  }
  const nodeElement = createElementFromHTML(htmlString);
  const selectorsObject = addSelectors(nodeElement);
  return selectorsObject;
};

type SelectorsObjectsArr = {
  selector: string;
  children: SelectorsObjectsArr;
}[];

const htmlToObject2 = (htmlString: string): SelectorsObjectsArr => {
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
  console.log(selectorsObjectArr);
  const merged = mergeDuplicates(selectorsObjectArr);
  console.log(merged);
  return selectorsObjectArr;
};

const selectorsObjectToScss = (selectorsObject: SelectorsObject): string => {
  const getSelectors = (object: any) => {
    let currentElement = "";
    Object.keys(object).forEach((key) => {
      const keys = key.split(".");
      keys.shift();
      if (keys.length > 1) {
        const childSelectors = getSelectors(object[key]);
        currentElement += `.${keys[0]}{&.${keys[1]}{${childSelectors}}}`;
      } else {
        const childSelectors = getSelectors(object[key]);
        currentElement += key + "{" + childSelectors + "}";
      }
    });
    return currentElement;
  };
  return getSelectors(selectorsObject);
};

export const htmlStringToScss = (htmlString: string): string => {
  const selectorsObject = htmlToObject(htmlString);
  htmlToObject2(htmlString);
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

function mergeDuplicates(arr: Array<any>) {
  const newArray: Array<any> = [];
  arr.forEach((item, i, self) => {
    const duplicates = self.filter((o) => item.selector === o.selector);
    //there are duplicates
    //todo: mege duplicated objects
    const allChildren: Array<any> = [];
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
    // console.log(merged);
  });
  return newArray;
}
