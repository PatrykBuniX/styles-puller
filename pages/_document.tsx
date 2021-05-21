import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function () {
                function getInitialColorMode() {
                    const isDarkPreferred = window.localStorage.getItem("prefers-dark");
                    
                    //if localStorage item for theme is set - return its value (true/false)
                    if (isDarkPreferred) {
                      return JSON.parse(isDarkPreferred);
                    }

                    //if user hasn't picked preferred theme yet, try to get it from media query preference
                    const mql = window.matchMedia("(prefers-color-scheme: dark)");
                    const hasMediaQueryPreference = typeof mql.matches === "boolean";
                    if (hasMediaQueryPreference) {
                      return mql.matches;
                    }

                    //otherwise default to dark
                    return true;
                  }
                  const isDarkPreferred = getInitialColorMode();
                  if(!isDarkPreferred){
                      //set body className based on preferred theme
                      document.body.classList.add("lightTheme");
                  }
              })();
            `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
