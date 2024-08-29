import { Event, ipcMain } from "electron";
import {
  isDirectory,
  isAFile,
  openDirectoryDialog,
  openFileDialog,
  selectEpubPath,
  selectAudioFilePath,
} from "./functions/fileSystem";
import fileTypeValidation from "./functions/fileTypeValidation";
import directoryExists from "./functions/directoryValidation";

// Wraps the 'main' process functions into a function that accepts electron
//  events of the type IpcMainInvokeEvent while allowing inputs from the
//  'renderer' process side of the application
function ipcEventWrapper<Input, Output>(mainProcessFn: (arg: Input) => Output) {
  return (_event: Event, args: Input) => mainProcessFn(args);
}

// The following functions were originally part of the the 'main.ts' file
//    Along with the 'preload.ts', these functions are what allow the
//    'main' and 'renderer' processes to interact.
export default function ipcHandler() {
  // Open the DevTools. (comment in/out)
  // mainWindow.webContents.openDevTools();

  // Toggle resizable window (comment in/out)
  // mainWindow.setResizable(false);

  // IPC communication - filesystem
  ipcMain.handle("dialog:openFile", ipcEventWrapper(openFileDialog));
  ipcMain.handle("dialog:openDirectory", ipcEventWrapper(openDirectoryDialog));
  ipcMain.handle("node:fs.statSync.isAFile", ipcEventWrapper(isAFile));
  ipcMain.handle("node:fs.statSync.isDirectory", ipcEventWrapper(isDirectory));
  ipcMain.handle("dialog:selectEpubPath", ipcEventWrapper(selectEpubPath));
  ipcMain.handle(
    "dialog:selectAudioFilePath",
    ipcEventWrapper(selectAudioFilePath)
  );

  // IPC communication - validation
  ipcMain.handle(
    "validation:fileTypeValidation",
    ipcEventWrapper(fileTypeValidation)
  );
  ipcMain.handle(
    "validation:directoryExists",
    ipcEventWrapper(directoryExists)
  );
}
