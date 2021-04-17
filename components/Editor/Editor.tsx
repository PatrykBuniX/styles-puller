import beautify from "js-beautify";
import styles from "./Editor.module.scss";
// import dynamic from "next/dynamic";
import MonacoEditor from "@monaco-editor/react";

interface Props {
  updateEditorValue: (value: string) => void;
  value: any;
  lang: "html" | "css";
  mode: string;
  isDarkTheme: boolean;
}

const Editor = ({
  value,
  updateEditorValue,
  lang,
  mode,
  isDarkTheme,
}: Props) => {
  const prettify = (code: string) => {
    updateEditorValue(beautify[lang](code));
  };
  const handleCopyClick = (value: string) => {
    navigator.clipboard.writeText(value).then(
      function () {
        alert("coppied to clipboard");
      },
      function (err) {
        alert("err: " + err);
      }
    );
  };
  const handleEditorChange = (value: string | undefined) => {
    value && updateEditorValue(value);
  };

  return (
    <div className={styles.codeEditor}>
      <MonacoEditor
        height="100%"
        value={value}
        theme={isDarkTheme ? "vs-dark" : "light"}
        onChange={handleEditorChange}
        language={mode}
        loading={<p>Editor is loading...</p>}
      />
      <div className={styles.buttonsWrapper}>
        <button onClick={() => prettify(value)}>prettify</button>
        <button onClick={() => handleCopyClick(value)}>copy</button>
      </div>
    </div>
  );
};

export default Editor;
