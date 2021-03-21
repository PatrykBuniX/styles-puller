import { useState } from "react";
import beautify from "js-beautify";
import { htmlStringToScss } from "../../lib/";
import styles from "./Main.module.scss";

import dynamic from "next/dynamic";
//import Editor dynamicly because it uses window object uder the hood
const Editor = dynamic(import("../../components/Editor/Editor"), {
  ssr: false,
});

const exampleCode = `<div class="wrapper"><p class="text">Hello world</p></div>`;

export const Main = () => {
  const [htmlString, setHtmlString] = useState(exampleCode);
  const [cssString, setCssString] = useState("");

  const handleConvertClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const css = htmlStringToScss(htmlString);
    setCssString(beautify.css(css));
  };

  const updateEditorValue = (lang: string, value: string) => {
    if (lang === "html") {
      setHtmlString(value);
    } else if (lang === "css") {
      setCssString(value);
    }
  };

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <h1>Styles Puller</h1>
      </header>
      <main className={styles.main}>
        <Editor
          value={htmlString}
          updateEditorValue={updateEditorValue}
          lang={"html"}
          mode={"html"}
          theme={"cobalt"}
        />
        <div className="convertWrapper">
          <button onClick={handleConvertClick}>convert</button>
        </div>
        <Editor
          value={cssString}
          updateEditorValue={updateEditorValue}
          lang={"css"}
          mode={"scss"}
          theme={"cobalt"}
        />
      </main>
    </div>
  );
};
