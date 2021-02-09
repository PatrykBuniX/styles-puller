import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import beautify from "js-beautify";
import styles from "./Editor.module.scss";

interface Props {
  setValue: any;
  value: any;
  mode: string;
  lang: string;
  theme: string;
  name: string;
}

export const Editor = ({ setValue, value, mode, lang, theme, name }: Props) => {
  const prettify = (lang: string, code: string) => {
    setValue(beautify[lang](code));
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
        mode={mode}
        theme={theme}
        onChange={(val: string) => {
          setValue(val);
        }}
        name={name}
        editorProps={{ $blockScrolling: true }}
        value={value}
        style={{ width: "100%", height: "100%" }}
      />
      <div className={styles.buttonsWrapper}>
        <button onClick={() => prettify(lang, value)}>prettify</button>
        <button onClick={() => handleCopyClick(value)}>copy</button>
      </div>
    </div>
  );
};
