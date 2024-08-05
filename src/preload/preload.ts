// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld("fileSystem", {
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  openDirectory: () => ipcRenderer.invoke("dialog:openDirectory"),
  isFile: (path: string) => ipcRenderer.invoke("node:fs.statSync.isFile", path),
  isDirectory: (path: string) =>
    ipcRenderer.invoke("node:fs.statSync.isDirectory", path),
  selectEpubPath: () => ipcRenderer.invoke("dialog:selectEpubPath"),
  selectAudioFilePath: () => ipcRenderer.invoke("dialog:selectAudioFilePath"),
});

