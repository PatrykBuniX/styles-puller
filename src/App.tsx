import styles from "./App.module.scss";
import { useState } from "react";
import beautify from "js-beautify";
import { htmlStringToScss } from "src/lib";
import { Editor } from "./components/editor/Editor";
const exampleCode = `<div class="wrapper"><p class="text">Hello world</p></div>`;

function App() {
  const [htmlString, setHtmlString] = useState(exampleCode);
  const [cssString, setCssString] = useState("");

  const handleConvertClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const css = htmlStringToScss(htmlString);
    setCssString(beautify.css(css));
  };

  return (
    <div className={styles.App}>
      <Editor
        value={htmlString}
        setValue={setHtmlString}
        mode={"html"}
        lang={"html"}
        theme={"cobalt"}
        name={"html-string-editor"}
        wrapperClass={"htmlEditor"}
      />
      <div className="convertWrapper">
        <button onClick={handleConvertClick}>convert</button>
      </div>
      <div className="cssEditor">
        <Editor
          value={cssString}
          setValue={setCssString}
          mode={"scss"}
          lang={"css"}
          theme={"cobalt"}
          name={"css-editor"}
          wrapperClass={"cssEditor"}
        />
      </div>
    </div>
  );
}

export default App;
