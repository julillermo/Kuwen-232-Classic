import { Event, ipcMain } from "electron";
import { isDirectory, isAFile } from "./functions/node/fileSystem";
import {
  openFileDialog,
  openDirectoryDialog,
} from "./functions/electron/dialog";
import fileTypeValidation from "./functions/utils/fileTypeValidation";
import directoryExists from "./functions/utils/directoryValidation";

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

  // IPC communication - electron:dialog
  ipcMain.handle("dialog:openFile", ipcEventWrapper(openFileDialog));
  ipcMain.handle("dialog:openDirectory", ipcEventWrapper(openDirectoryDialog));

  // IPC communication - node:fs
  ipcMain.handle("node:fs.statSync.isAFile", ipcEventWrapper(isAFile));
  ipcMain.handle("node:fs.statSync.isDirectory", ipcEventWrapper(isDirectory));

  // IPC communication - utils:validation
  ipcMain.handle(
    "validation:fileTypeValidation",
    ipcEventWrapper(fileTypeValidation)
  );
  ipcMain.handle(
    "validation:directoryExists",
    ipcEventWrapper(directoryExists)
  );
}
