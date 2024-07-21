import { app, BrowserWindow, nativeTheme } from "electron";
import * as path from "path";

let mainWindow: BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
    },
    width: 800,
    height: 600,
  });

  // Vite dev server URL
  // mainWindow.setResizable(false);
  mainWindow.loadURL("http://localhost:5173");
  mainWindow.on("closed", () => (mainWindow = null));
}

app.whenReady().then(() => {
  createWindow();
  nativeTheme.themeSource = "light"; // enforces light mode
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow == null) {
    createWindow();
  }
});
