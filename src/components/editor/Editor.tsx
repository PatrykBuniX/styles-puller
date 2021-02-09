import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import beautify from "js-beautify";

interface Props {
  setValue: any;
  value: any;
  mode: string;
  lang: string;
  theme: string;
  name: string;
  wrapperClass: string;
}

export const Editor = ({
  setValue,
  value,
  mode,
  lang,
  theme,
  name,
  wrapperClass,
}: Props) => {
  const prettify = (lang: string, code: string) => {
    setValue(beautify[lang](code));
  };

  return (
    <div className={wrapperClass}>
      <AceEditor
        mode={mode}
        theme={theme}
        onChange={(val: string) => {
          setValue(val);
        }}
        name={name}
        editorProps={{ $blockScrolling: true }}
        value={value}
      />
      <button onClick={() => prettify(lang, value)}>prettify</button>
      <button>copy</button>
    </div>
  );
};
