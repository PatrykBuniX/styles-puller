import beautify from "js-beautify";
import styles from "./Editor.module.scss";
//react ace editor
import AceEditor from "react-ace";
import "brace/mode/html";
import "brace/mode/scss";
import "brace/theme/cobalt";

//codemirror
interface Props {
  updateEditorValue: (lang: string, value: string) => void;
  value: any;
  lang: "html" | "css";
  mode: string;
  theme: string;
}

const Editor = ({ updateEditorValue, value, lang, theme, mode }: Props) => {
  console.log("theme: ", theme);
  const prettify = (lang: "html" | "css", code: string) => {
    updateEditorValue(lang, beautify[lang](code));
  };
  const handleCopyClick = (value: string) => {
    console.log(value);
    navigator.clipboard.writeText(value).then(
      function () {
        /* success */
        alert("coppied to clipboard");
      },
      function (err) {
        /* failure */
        alert("err: " + err);
      }
    );
  };

  return (
    <div className={styles.codeEditor}>
      <AceEditor
        theme={theme}
        onChange={(val: string) => {
          updateEditorValue(lang, val);
        }}
        name={mode}
        editorProps={{ $blockScrolling: true }}
        value={value}
        style={{ width: "100%", height: "100%" }}
        mode={mode}
      />
      <div className={styles.buttonsWrapper}>
        <button onClick={() => prettify(lang, value)}>prettify</button>
        <button onClick={() => handleCopyClick(value)}>copy</button>
      </div>
    </div>
  );
};

export default Editor;
