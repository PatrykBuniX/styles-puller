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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 110.379 122.879"
              aria-hidden="true"
            >
              <path d="M41.759 15.103l-.003.174h35.077c.089 0 .176.005.262.016 3.325.267 6.487.843 9.461 1.78l.008.003c3.021.95 5.853 2.286 8.469 4.062a28.65 28.65 0 014.768 4.033 28.298 28.298 0 013.532 4.618c1.557 2.527 2.806 5.523 3.803 8.643 1.228 3.84 2.076 7.868 2.65 11.415.229 1.417.398 2.801.449 4.005.059 1.382-.049 2.591-.399 3.472a4.364 4.364 0 01-.801 1.326 3.606 3.606 0 01-1.357.949c-3.667 1.468-6.662-2.08-8.46-4.211l-.004.003-.331-.393c-3.032-3.536-6.757-6.041-11.022-7.732-4.333-1.718-9.252-2.611-14.598-2.903l-31.771.002.015.271v9.127c0 .086-.005.17-.015.253-.089 2.142-.799 3.66-2.136 4.544-1.34.887-3.091.97-5.257.24a2.104 2.104 0 01-.632-.341c-10.452-8.2-20.905-16.397-31.353-24.602l-.147-.127C.23 32.152-.25 30.51.114 28.867c.322-1.452 1.333-2.69 2.692-3.761l28.87-22.727C32.926 1.395 34.238.63 35.473.26c1.107-.332 2.187-.362 3.181-.002 1.084.393 1.95 1.188 2.502 2.475.393.917.615 2.098.615 3.584v8.556c.001.078-.003.155-.012.23zm26.86 92.673l.003-.175H33.545c-.088 0-.176-.005-.261-.016-3.325-.267-6.488-.843-9.461-1.78l-.007-.003c-3.021-.949-5.853-2.285-8.469-4.061a28.63 28.63 0 01-4.791-4.059 28.395 28.395 0 01-3.551-4.656c-1.622-2.646-2.98-6.021-4.055-9.54C1.674 79.305.793 74.926.343 71.341a24.804 24.804 0 01-.213-3.053c.001-1.071.125-2.011.414-2.735.202-.506.467-.945.798-1.314.385-.43.838-.751 1.36-.961 3.667-1.468 6.663 2.08 8.46 4.212l.004-.003.332.393c3.032 3.536 6.756 6.041 11.022 7.731 4.333 1.718 9.252 2.611 14.598 2.903l31.77-.003-.015-.271-.001-9.127c0-.086.006-.17.016-.253.089-2.143.799-3.661 2.136-4.545 1.341-.887 3.091-.97 5.257-.239.235.078.447.195.632.341l31.354 24.602.147.127c1.736 1.58 2.217 3.224 1.853 4.865-.322 1.452-1.333 2.69-2.692 3.761L78.702 120.5c-1.25.984-2.562 1.748-3.797 2.118-1.107.332-2.187.362-3.182.003-1.084-.393-1.95-1.188-2.502-2.476-.393-.917-.615-2.098-.615-3.584v-8.556c0-.077.005-.153.013-.229zm3.61-2.751c.465.773.603 1.688.592 2.831l.006.149v8.556c0 .904.097 1.535.269 1.936.051.118.057.165.063.167.082.03.274-.004.544-.084.699-.209 1.534-.716 2.396-1.394l28.869-22.728c.652-.514 1.111-.986 1.193-1.354.034-.157-.121-.416-.555-.815L74.6 67.956c-.664-.199-1.081-.242-1.253-.128-.146.097-.233.486-.259 1.165l.004 9.172c.075 1.035-.088 1.955-.538 2.734-.531.924-1.354 1.532-2.516 1.771a2.106 2.106 0 01-.512.063H37.117v-.005l-.107-.003c-5.816-.309-11.215-1.293-16.04-3.205-4.89-1.938-9.166-4.817-12.66-8.889l-.36-.423.004-.004-.004-.005c-.996-1.181-2.616-3.102-3.517-3.049-.069.218-.1.616-.101 1.14 0 .683.074 1.562.197 2.542a70.788 70.788 0 002.442 11.435c.975 3.191 2.191 6.228 3.626 8.568a24.113 24.113 0 003.023 3.964 24.496 24.496 0 004.083 3.465c2.238 1.519 4.708 2.677 7.38 3.52 2.655.839 5.505 1.355 8.521 1.599h35.392v.009c1.573 0 2.574.539 3.233 1.633zm-34.08-87.171c-.466-.772-.604-1.688-.592-2.831l-.005-.149V6.317c0-.904-.098-1.535-.269-1.936-.051-.118-.057-.165-.063-.167-.083-.03-.274.004-.544.084-.699.21-1.535.716-2.396 1.394L5.411 28.419c-.652.514-1.111.987-1.192 1.354-.035.158.121.416.555.815 10.332 8.115 20.671 16.223 31.006 24.334.664.2 1.081.242 1.251.128.147-.097.234-.487.259-1.165l-.003-9.172c-.075-1.036.088-1.956.538-2.735.532-.924 1.355-1.532 2.515-1.771.164-.041.335-.063.513-.063h32.409v.005l.107.003c5.815.308 11.215 1.293 16.039 3.206 4.89 1.938 9.166 4.817 12.66 8.889l.359.423-.004.003.004.004c.996 1.181 2.616 3.103 3.517 3.049.1-.305.12-.916.087-1.712-.043-1.017-.193-2.237-.4-3.511-.547-3.382-1.351-7.204-2.502-10.805-.898-2.81-2.01-5.487-3.375-7.703a24.17 24.17 0 00-3.02-3.942 24.446 24.446 0 00-4.06-3.44c-2.238-1.519-4.708-2.677-7.38-3.52-2.655-.839-5.505-1.355-8.521-1.599H41.382v-.008c-1.573.001-2.573-.537-3.233-1.632z" />
            </svg>
            <span>convert</span>
          </button>
          <button className={styles.optionsButton} onClick={() => setIsOptionsMenuOpen(true)}>
            <svg
              width="25"
              height="25"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100.25 100.25"
              aria-hidden="true"
            >
              <path d="M50 30.5c-10.201 0-18.5 8.299-18.5 18.5S39.799 67.5 50 67.5 68.5 59.201 68.5 49 60.201 30.5 50 30.5zm0 34c-8.547 0-15.5-6.953-15.5-15.5S41.453 33.5 50 33.5 65.5 40.453 65.5 49 58.547 64.5 50 64.5z" />
              <path d="M95.225 41.501L83.257 39.69a33.974 33.974 0 00-2.651-6.425l7.176-9.733a1.501 1.501 0 00-.146-1.951l-9.216-9.215a1.501 1.501 0 00-1.951-.147l-9.702 7.152a33.925 33.925 0 00-6.466-2.691L58.5 4.776A1.5 1.5 0 0057.017 3.5H43.985a1.5 1.5 0 00-1.483 1.276L40.701 16.68a33.99 33.99 0 00-6.466 2.691l-9.702-7.152a1.5 1.5 0 00-1.951.147l-9.215 9.215a1.501 1.501 0 00-.147 1.951l7.176 9.733a33.974 33.974 0 00-2.651 6.425L5.777 41.501a1.5 1.5 0 00-1.276 1.483v13.032a1.5 1.5 0 001.275 1.483l12.027 1.82a34.073 34.073 0 002.647 6.341l-7.231 9.808a1.501 1.501 0 00.147 1.951l9.215 9.215a1.5 1.5 0 001.951.147l9.84-7.254a33.973 33.973 0 006.3 2.607l1.829 12.09a1.5 1.5 0 001.483 1.276h13.032a1.5 1.5 0 001.483-1.276l1.829-12.09a33.973 33.973 0 006.3-2.607l9.84 7.254c.597.44 1.426.377 1.951-.147l9.216-9.215a1.5 1.5 0 00.146-1.951L80.55 65.66a33.939 33.939 0 002.647-6.341l12.027-1.82a1.5 1.5 0 001.275-1.483V42.984a1.499 1.499 0 00-1.274-1.483zM93.5 54.726l-11.703 1.771a1.502 1.502 0 00-1.224 1.09 31.012 31.012 0 01-3.103 7.432c-.3.517-.265 1.162.09 1.643l7.04 9.549-7.391 7.391-9.578-7.061a1.499 1.499 0 00-1.637-.093 30.946 30.946 0 01-7.395 3.06 1.5 1.5 0 00-1.094 1.225l-1.78 11.769H45.273l-1.78-11.769a1.502 1.502 0 00-1.094-1.225 30.946 30.946 0 01-7.395-3.06 1.502 1.502 0 00-1.637.093l-9.578 7.061-7.391-7.391 7.04-9.549a1.5 1.5 0 00.09-1.643 30.995 30.995 0 01-3.103-7.432 1.5 1.5 0 00-1.224-1.09L7.498 54.726V44.274l11.65-1.762a1.5 1.5 0 001.226-1.099 30.971 30.971 0 013.099-7.514 1.5 1.5 0 00-.093-1.638l-6.982-9.471 7.391-7.391 9.443 6.961a1.5 1.5 0 001.644.089 30.98 30.98 0 017.55-3.142 1.5 1.5 0 001.095-1.225l1.752-11.583h10.452l1.752 11.583a1.5 1.5 0 001.095 1.225 30.997 30.997 0 017.55 3.142 1.499 1.499 0 001.644-.089l9.443-6.961L84.6 22.79l-6.982 9.471a1.5 1.5 0 00-.093 1.638 31.011 31.011 0 013.099 7.514 1.501 1.501 0 001.226 1.099l11.65 1.762v10.452z" />
            </svg>
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
