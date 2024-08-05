import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import {
  openDirectoryDialog,
  openFileDialog,
  isFile,
  isDirectory,
  selectEpubPath,
  selectAudioFilePath,
} from "./fileSystem";
import { readZip } from "./zip";

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createMainWindow = () => {
  // Create the browser window.

  // __dirname is ".vite/build"
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600 + 25, // added 25px to account for the global menu bar
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),

      // Context Isolation means that preload scripts are isolated from
      // the renderer's main world to avoid leaking any privileged APIs
      // into your web content's code.
      //
      // This means that the window object that your preload script has
      // access to is actually a different object than the website would
      // have access to.
      contextIsolation: true,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    // MAIN_WINDOW_VITE_DEV_SERVER_URL is the localhost
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    console.log(
      `🛜  Loaded through localhost ${MAIN_WINDOW_VITE_DEV_SERVER_URL}`
    );
  } else {
    // MAIN_WINDOW_VITE_NAME is "main_window"
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
    console.log(
      `📁  Loaded through a local file:  ${path.join(
        __dirname,
        `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`
      )}`
    );
  }

  // Open the DevTools. (comment in/out)
  // mainWindow.webContents.openDevTools();

  // Toggle resizable window (comment in/out)
  // mainWindow.setResizable(false);

  // IPC communicaition - FileSystem
  ipcMain.handle("dialog:openFile", openFileDialog);
  ipcMain.handle("dialog:openDirectory", openDirectoryDialog);
  ipcMain.handle("node:fs.statSync.isFile", isFile);
  ipcMain.handle("node:fs.statSync.isDirectory", isDirectory);
  ipcMain.handle("dialog:selectEpubPath", selectEpubPath);
  ipcMain.handle("dialog:selectAudioFilePath", selectAudioFilePath);
  // IPC communicaition - JSZip
  ipcMain.handle("JSZip:readZip", readZip);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createMainWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
