import { useEffect } from "react";
import { Main } from "../components/Main/Main";

const handleCtrSave = (e: KeyboardEvent) => {
  if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) && e.key === "s") {
    e.preventDefault();
  }
};

function App() {
  useEffect(() => {
    window.addEventListener("keydown", handleCtrSave, false);
    return () => window.removeEventListener("keydown", handleCtrSave, false);
  }, []);
  return (
    <>
      <Main />
    </>
  );
}

export default App;
