// import { useState } from "react";
import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-javascript";
// import "ace-builds/src-noconflict/theme-github";
import "ace-builds/webpack-resolver";
import { useState } from "react";
import beautify from "js-beautify";
import { htmlStringToScss } from "src/lib";
const exampleCode = `<div class="wrapper"><p class="text">Hello world</p></div>`;

export const Editor = () => {
  const [htmlString, setHtmlString] = useState(exampleCode);
  const [cssString, setCssString] = useState("");

  const prettifyHtml = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setHtmlString(beautify.html(htmlString));
  };
  const prettifyCss = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setCssString(beautify["css"](cssString));
  };

  const handleConvertClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const css = htmlStringToScss(htmlString);
    setCssString(beautify.css(css));
  };

  return (
    <div className="wrapper">
      <AceEditor
        mode="html"
        theme="github"
        onChange={(val: string) => {
          setHtmlString(val);
        }}
        name="html-string-editor"
        editorProps={{ $blockScrolling: true }}
        value={htmlString}
        height={"250px"}
      />
      <button onClick={prettifyHtml}>prettify</button>
      <button onClick={handleConvertClick}>convert</button>
      <AceEditor
        mode="scss"
        theme="github"
        onChange={(val: string) => {
          setCssString(val);
        }}
        name="css-editor"
        editorProps={{ $blockScrolling: true }}
        value={cssString}
        height={"250px"}
      />
      <button onClick={prettifyCss}>prettify</button>
    </div>
  );
};
