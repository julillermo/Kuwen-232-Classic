import {
  FileTypeValidationProps,
  FileTypeValidationRes,
} from "./functions/fileTypeValidation";
import {
  DirectoryExistsProps,
  DirectoryExistsRes,
} from "./functions/directoryValidation";

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

// Colleciton of types to be made accessible on the 'renderer' process:
export {
  FileTypeValidationProps,
  FileTypeValidationRes,
  DirectoryExistsProps,
  DirectoryExistsRes,
};
