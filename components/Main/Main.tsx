import { useCallback, useEffect, useState } from "react";
import beautify from "js-beautify";
import { htmlStringToStyles, HtmlStringToStylesOptions } from "../../lib/";
import styles from "./Main.module.scss";
import { Editor } from "../Editor/Editor";
import clsx from "clsx";
import { OptionsMenu } from "../OptionsMenu/OptionsMenu";
import { usePersistentState } from "../../hooks/usePersistentState";

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
  const [isDarkTheme, setIsDarkTheme] = usePersistentState(true, "darkTheme");
  const [conversionOptions, setConversionOptions] =
    usePersistentState<HtmlStringToStylesOptions>(
      {
        includeModifiers: true,
        mode: "scss",
        tagNamesOnly: false,
      },
      "convertionOptions"
    );

  const handleConvertClick = () => {
    const css = htmlStringToStyles(htmlString, conversionOptions);
    setCssString(beautify.css(css));
  };

  const handleToggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const handleConvertionOptionsChange = (
    options: HtmlStringToStylesOptions
  ) => {
    const css = htmlStringToStyles(htmlString, options);
    setCssString(beautify.css(css));
    setConversionOptions(options);
  };

  const updateCss = useCallback((v: string) => {
    setCssString(v);
  }, []);

  const updateHtml = useCallback((v: string) => {
    setHtmlString(v);
  }, []);

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
          updateEditorValue={updateHtml}
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
          updateEditorValue={updateCss}
          lang={"css"}
          mode={conversionOptions.mode}
          isDarkTheme={isDarkTheme}
        />
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2021</p>
        <p>
          Created by{" "}
          <a rel="noreferrer noopener" href="https://github.com/PatrykBuniX">
            patrykbunix
          </a>
        </p>
      </footer>
      {isOptionsMenuOpen && (
        <OptionsMenu
          handleMenuClose={() => setIsOptionsMenuOpen(false)}
          handleConvertionOptionsChange={handleConvertionOptionsChange}
          options={conversionOptions}
        />
      )}
    </div>
  );
};
