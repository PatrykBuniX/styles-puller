import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";

interface Props {
  setValue: any;
  value: any;
  mode: string;
  theme: string;
  name: string;
}

export const Editor = ({ setValue, value, mode, theme, name }: Props) => {
  return (
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
  );
};
