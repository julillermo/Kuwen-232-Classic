import { Global, css } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { versionsIPC, fileSystemIPC } from "./types/globalNamesAddition";
const { versions } = window;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

/**
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag
 */

console.log(
  '👋 This message is being logged by "renderer.ts", included via Vite'
);
console.log(
  '🧠 From what I understand, the main.tsx file will now serve as the "renderer" for communicating functionality'
);

console.log("node version:", versions.node());
console.log("chrome version:", versions.chrome());
console.log("node version:", versions.node());
// console.log("IPC ping:", await versions.ping());

console.log("window innerWidth", window.innerWidth);
console.log("window innerHeight", window.innerHeight);

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

// Adding typing to the added objects in the global names
declare global {
  interface Window {
    versions: versionsIPC;
    fileSystemIPC: fileSystemIPC;
  }
}
