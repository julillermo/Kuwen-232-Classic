import { IpcMainInvokeEvent, dialog } from "electron";
import * as fs from "node:fs";

export async function openFileDialog() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openFile"],
  });
  if (!canceled) {
    return filePaths[0];
  }
}

export async function openDirectoryDialog() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
    defaultPath: "~/",
  });
  if (!canceled) {
    return filePaths[0];
  }
}

export function isFile(_: IpcMainInvokeEvent, path: string): boolean {
  let stats;
  try {
    stats = fs.statSync(path);
  } catch (err: unknown) {
    // path is neither a file path nor a directory path
  }
  return stats ? stats.isFile() : false;
}

export function isDirectory(_: IpcMainInvokeEvent, path: string): boolean {
  let stats;
  try {
    stats = fs.statSync(path);
  } catch (err: unknown) {
    // path is neither a file path nor a directory path
  }
  return stats ? stats.isDirectory() : false;
}

export async function selectEpubPath() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [
      { name: "EPUB", extensions: ["epub", "zip"] },
      { name: "All Files", extensions: ["*"] },
    ],
  });
  if (!canceled) {
    return filePaths[0];
  }
}

export async function selectAudioFilePath() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [
      { name: "MP3", extensions: ["mp3"] },
      { name: "All Files", extensions: ["*"] },
    ],
  });
  if (!canceled) {
    return filePaths[0];
  }
}
