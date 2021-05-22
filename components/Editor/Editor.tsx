import React, { useEffect } from "react";
import beautify from "js-beautify";
import styles from "./Editor.module.scss";
import MonacoEditor from "@monaco-editor/react";
import { useState } from "react";
import { Loading } from "../Loading/Loading";

interface Props {
  updateEditorValue: (value: string) => void;
  value: string;
  lang: "html" | "css";
  mode: string;
  isDarkTheme: boolean;
}

const Editor = React.memo(({ value, updateEditorValue, lang, mode, isDarkTheme }: Props) => {
  const [isCopiedActive, setIsCopiedActive] = useState(false);
  const [editorHeight, setEditorHeight] = useState(700);

  useEffect(() => {
    setEditorHeight(window.innerWidth <= 1100 ? 500 : 700);
    const handleWindowResize = () => {
      setEditorHeight(window.innerWidth <= 1100 ? 500 : 700);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

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
      <h2>
        Your <strong>{mode}</strong> code:
      </h2>
      <MonacoEditor
        height={editorHeight}
        value={value}
        theme={isDarkTheme ? "vs-dark" : "light"}
        onChange={handleEditorChange}
        language={mode}
        loading={<Loading />}
        options={{
          minimap: { enabled: false },
          padding: { top: 20 },
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
});

Editor.displayName = "Editor";

export { Editor };
