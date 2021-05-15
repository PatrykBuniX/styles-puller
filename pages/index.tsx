import Head from "next/head";
import { useEffect } from "react";
import { Main } from "../components/Main/Main";

const handleCtrSave = (e: KeyboardEvent) => {
  if (
    (window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) &&
    e.key === "s"
  ) {
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
      <Head>
        <title>StylesPuller</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Main />
    </>
  );
}

export default App;
