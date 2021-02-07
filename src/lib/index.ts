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
    return Array.from(nodes).reduce((acc: SelectorsObject, node: ChildNode) => {
      if (!isHTMLElement(node)) {
        return acc;
      }
      const { classList, tagName } = node as HTMLElement;

      const nextField = classList.value
        ? `.${classList.value}`
        : tagName.toLowerCase();

      acc[nextField] = addSelectors(node.childNodes);
      return acc;
    }, {});
  }
  const nodeElement = createElementFromHTML(htmlString);
  const selectorsObject = addSelectors(nodeElement);
  return selectorsObject;
};

const selectorsObjectToScss = (selectorsObject: SelectorsObject): string => {
  const jsonString = JSON.stringify(selectorsObject);
  const formatted = /{(.+)}/g
    .exec(jsonString)![1]
    .replace(/"([^"]+)":/g, "$1")
    .replace(/\,/g, "\n");
  return formatted;
};

export const htmlStringToScss = (htmlString: string): string => {
  console.log(htmlString);
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
