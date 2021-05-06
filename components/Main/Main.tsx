import { useState } from "react";
import beautify from "js-beautify";
import { htmlStringToStyles, HtmlStringToStylesOptions } from "../../lib/";
import styles from "./Main.module.scss";
import { Editor } from "../Editor/Editor";
import clsx from "clsx";
import { OptionsMenu } from "../OptionsMenu/OptionsMenu";

const exampleCode = `<div class="wrapper">
  <p class="text"><span class="red">hello</span></p>
  <p class="text"><span class="blue">hello blue!</span></p>
  <p class="text text--active"><span class="blue">hello blue!</span></p>
  <p class="text text--active"><span class="red">hello</span></p>
</div>`;

export const Main = () => {
  const [htmlString, setHtmlString] = useState(exampleCode);
  const [cssString, setCssString] = useState("");
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [
    conversionOptions,
    setConversionOptions,
  ] = useState<HtmlStringToStylesOptions>({
    includeModifiers: true,
    mode: "scss",
  });

  const handleConvertClick = () => {
    const css = htmlStringToStyles(htmlString, conversionOptions);
    setCssString(beautify.css(css));
  };

  const handleToggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <div className={clsx(styles.App, !isDarkTheme && styles.lightTheme)}>
      <header className={styles.header}>
        <div className={styles.headerLogo}>
          <h1>
            <code>{"<styles> Puller"}</code>
          </h1>
          <p>
            Pull <strong>css</strong> selectors <strong>out of</strong> your{" "}
            <strong>html</strong> code!
          </p>
        </div>
        <div className={styles.toggleThemeButton}>
          <button onClick={handleToggleTheme}>
            <strong>{isDarkTheme ? "Light" : "Dark"}</strong> theme
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <Editor
          value={htmlString}
          updateEditorValue={(v) => setHtmlString(v)}
          lang={"html"}
          mode={"html"}
          isDarkTheme={isDarkTheme}
        />
        <div className={styles.menuWrapper}>
          <button className={styles.convertButton} onClick={handleConvertClick}>
            convert
          </button>
          <button
            className={styles.optionsButton}
            onClick={() => setIsOptionsMenuOpen(true)}
          >
            options
          </button>
        </div>
        <Editor
          value={cssString}
          updateEditorValue={(v) => setCssString(v)}
          lang={"css"}
          mode={conversionOptions.mode}
          isDarkTheme={isDarkTheme}
        />
      </main>
      {isOptionsMenuOpen && (
        <OptionsMenu
          handleMenuClose={() => setIsOptionsMenuOpen(false)}
          setConversionOptions={setConversionOptions}
          options={conversionOptions}
        />
      )}
    </div>
  );
};
