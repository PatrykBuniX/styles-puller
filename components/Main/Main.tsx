import { useCallback, useEffect, useState } from "react";
import beautify from "js-beautify";
import { htmlStringToStyles, HtmlStringToStylesOptions } from "../../lib/";
import styles from "./Main.module.scss";
import { Editor } from "../Editor/Editor";
import clsx from "clsx";
import { OptionsMenu } from "../OptionsMenu/OptionsMenu";
import { usePersistentState } from "../../hooks/usePersistentState";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { ConvertIcon } from "../icons/ConvertIcon";
import { OptionsIcon } from "../icons/OptionsIcon";

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
  const [isDarkTheme, setIsDarkTheme] = useState<boolean | null>(null);
  const [conversionOptions, setConversionOptions] = usePersistentState<HtmlStringToStylesOptions>(
    {
      includeModifiers: true,
      mode: "scss",
      tagNamesOnly: false,
    },
    "convertionOptions"
  );

  //set theme mode state based on body className
  useEffect(() => {
    const isDarkPreferred = !document.body.classList.contains("lightTheme");
    setIsDarkTheme(isDarkPreferred);
  }, []);

  //each time theme state's value changes (except the first one - when its value is null) save it to localStorage and update body className
  useEffect(() => {
    if (isDarkTheme === null) return;
    window.localStorage.setItem("prefers-dark", JSON.stringify(isDarkTheme));
    document.body.classList.toggle("lightTheme", !isDarkTheme);
  }, [isDarkTheme]);

  const handleToggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const handleConvertClick = () => {
    const css = htmlStringToStyles(htmlString, conversionOptions);
    setCssString(beautify.css(css));
  };

  const handleConvertionOptionsChange = (options: HtmlStringToStylesOptions) => {
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
    <div className={clsx(styles.App)}>
      <Header isDarkTheme={!!isDarkTheme} handleToggleTheme={handleToggleTheme} />
      <main className={styles.main}>
        <Editor
          value={htmlString}
          updateEditorValue={updateHtml}
          lang={"html"}
          mode={"html"}
          isDarkTheme={!!isDarkTheme}
        />
        <div className={styles.menuWrapper}>
          <button className={styles.convertButton} onClick={handleConvertClick}>
            <ConvertIcon />
            <span>convert</span>
          </button>
          <button className={styles.optionsButton} onClick={() => setIsOptionsMenuOpen(true)}>
            <OptionsIcon />
            <span>options</span>
          </button>
        </div>
        <Editor
          value={cssString}
          updateEditorValue={updateCss}
          lang={"css"}
          mode={conversionOptions.mode}
          isDarkTheme={!!isDarkTheme}
        />
      </main>
      <Footer />
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
