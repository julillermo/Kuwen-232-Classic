import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Global, css } from "@emotion/react";

function GlobalStyle() {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: "Comic Neue";
          src: url("./assets/fonts/Comic_Neue/ComicNeue-Regular.ttf");
        }

        html,
        body {
          margin: 0 0 0 0;
          padding: 0 0 0 0;

          background-color: #282c34;
          color: #abb2bf;

          font-family: "Comic Neue";
        }

        input,
        textarea {
          font-family: "Comic Neue";
        }
      `}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
