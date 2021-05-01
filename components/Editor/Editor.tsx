import beautify from "js-beautify";
import styles from "./Editor.module.scss";
import MonacoEditor from "@monaco-editor/react";
import { useState } from "react";

interface Props {
  updateEditorValue: (value: string) => void;
  value: string;
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
  const [isCopiedActive, setIsCopiedActive] = useState(false);

  const prettify = () => {
    updateEditorValue(beautify[lang](value));
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(value).then(() => {
      if (isCopiedActive) return;
      setIsCopiedActive(true);
      setTimeout(() => {
        setIsCopiedActive(false);
      }, 500);
    });
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
        options={{
          minimap: { enabled: false },
        }}
      />
      <div className={styles.buttonsWrapper}>
        <button onClick={prettify}>prettify</button>
        <button
          onClick={handleCopyClick}
          dangerouslySetInnerHTML={{
            __html: isCopiedActive ? "copied&nbsp;&check;" : "copy",
          }}
        ></button>
      </div>
    </div>
  );
};

export default Editor;
