const createElementFromHTML = (htmlString: string) => {
  var div = document.createElement("div");
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

const selectorsObjectToScss = (selectorsObject: SelectorsObject): string => {
  console.log(selectorsObject);

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
  return selectorsObjectToScss(selectorsObject);
};

//tooling
// const htmlStringForm = <HTMLFormElement>(
//   document.getElementById("html-string-form")
// );
// const resultForm = <HTMLFormElement>document.getElementById("result-form");
// const htmlTextArea = <HTMLTextAreaElement>document.getElementById("htmlString");
// const resultTextArea = <HTMLTextAreaElement>document.getElementById("result");

// const handleHTMLSubmit = (event: Event) => {
//   event.preventDefault();
//   const selectorsObject = htmlToObject(htmlTextArea.value);
//   resultTextArea.value = selectorsObjectToCss(selectorsObject);
// };
// const handleCopyResult = (event: Event) => {
//   event.preventDefault();

//   resultTextArea.select();
//   document.execCommand("copy");
// };
