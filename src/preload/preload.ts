// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

// When calling these functions, it may help to call them with the 
//  `await` keyword even when the functions aren't asynchronous themselves.

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld("fileSystem", {
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  openDirectory: () => ipcRenderer.invoke("dialog:openDirectory"),
  isAFile: (path: string) =>
    ipcRenderer.invoke("node:fs.statSync.isAFile", path),
  isDirectory: (path: string) =>
    ipcRenderer.invoke("node:fs.statSync.isDirectory", path),
  selectEpubPath: () => ipcRenderer.invoke("dialog:selectEpubPath"),
  selectAudioFilePath: () => ipcRenderer.invoke("dialog:selectAudioFilePath"),
});

contextBridge.exposeInMainWorld("validation", {
  fileTypeValidation: (path: string) =>
    ipcRenderer.invoke("validation:fileTypeValidation", path),
  directoryExists: (path: string) =>
    ipcRenderer.invoke("validation:directoryExists", path),
});