import {
  DirectoryExistsProps,
  DirectoryExistsRes,
  FileTypeValidationProps,
  FileTypeValidationRes,
} from "../../main/ipcTypes";

export type versionsIPC = {
  node: () => string;
  chrome: () => string;
  electron: () => string;
};

export type FileSystemIPC = {
  openFile: () => Promise<string>;
  openDirectory: () => Promise<string>;
  isFile: (path: string) => Promise<boolean>;
  isDirectory: (path: string) => Promise<boolean>;
  selectEpubPath: () => Promise<string>;
  selectAudioFilePath: () => Promise<string>;
};

export type ValidationIPC = {
  fileTypeValidation: ({
    filePath,
    targetFileExtensions,
    booleanResult,
  }: FileTypeValidationProps) => Promise<FileTypeValidationRes>;
  directoryExists: ({
    directoryPath,
    booleanResult,
  }: DirectoryExistsProps) => DirectoryExistsRes;
};
