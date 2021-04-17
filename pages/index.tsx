import Head from "next/head";
import { Main } from "../components/Main/Main";

function App() {
  return (
    <>
      <Head>
        <title>StylesPuller</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Main />
    </>
  );
}

export default App;
