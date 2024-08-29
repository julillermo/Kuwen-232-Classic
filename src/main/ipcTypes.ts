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
  isAFile: (path: string) => Promise<boolean>;
  isDirectory: (path: string) => Promise<boolean>;
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
