import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { versionsIPC } from "./types/globalNamesAddition";
const { versions } = window;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
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

console.log("node version:", versions.node());
console.log("chrome version:", versions.chrome());
console.log("node version:", versions.node());

// Adding typing to the added objects in the global names
declare global {
  interface Window {
    versions: versionsIPC;
  }
}
