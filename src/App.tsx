import styles from "./App.module.scss";
import { useState } from "react";
import beautify from "js-beautify";
import { htmlStringToScss } from "src/lib";
import { Editor } from "./components/editor/Editor";
const exampleCode = `<div class="wrapper"><p class="text">Hello world</p></div>`;

function App() {
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
    <div className={styles.App}>
      <div className="htmlEditor">
        <Editor
          value={htmlString}
          setValue={setHtmlString}
          mode={"html"}
          theme={"cobalt"}
          name={"html-string-editor"}
        />
        <button onClick={prettifyHtml}>prettify</button>
        <button>copy</button>
      </div>
      <div className="convertWrapper">
        <button onClick={handleConvertClick}>convert</button>
      </div>
      <div className="cssEditor">
        <Editor
          value={cssString}
          setValue={setCssString}
          mode={"scss"}
          theme={"cobalt"}
          name={"css-editor"}
        />
        <button onClick={prettifyCss}>prettify</button>
        <button onClick={prettifyCss}>copy</button>
      </div>
    </div>
  );
  // return (
  //   <div className={styles.App}>
  //     <Editor />
  //   </div>
  // );
}

export default App;
