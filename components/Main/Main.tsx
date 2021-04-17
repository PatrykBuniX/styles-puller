import { useState } from "react";
import beautify from "js-beautify";
import { htmlStringToScss } from "../../lib/";
import styles from "./Main.module.scss";
import Editor from "../Editor/Editor";

const exampleCode = `<div class="wrapper">
  <p class="text"><span class="red">hello</span></p>
  <p class="text"><span class="blue">hello blue!</span></p>
  <p class="text text--active"><span class="blue">hello blue!</span></p>
  <p class="text text--active"><span class="red">hello</span></p>
</div>`;

export const Main = () => {
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
      <header className={styles.header}>
        <h1>Styles Puller</h1>
      </header>
      <main className={styles.main}>
        <Editor
          value={htmlString}
          updateEditorValue={(v) => setHtmlString(v)}
          lang={"html"}
          mode={"html"}
          isDarkTheme={true}
        />
        <div className="convertWrapper">
          <button onClick={handleConvertClick}>convert</button>
        </div>
        <Editor
          value={cssString}
          updateEditorValue={(v) => setCssString(v)}
          lang={"css"}
          mode={"scss"}
          isDarkTheme={true}
        />
      </main>
    </div>
  );
};
