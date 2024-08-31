import {
  FileTypeValidationProps,
  FileTypeValidationRes,
} from "./functions/utils/fileTypeValidation";
import {
  DirectoryExistsProps,
  DirectoryExistsRes,
} from "./functions/utils/directoryValidation";
import { OpenDialogProps } from "./functions/electron/dialog";

// Unless required by the original function, it seems generally safer to
//  make the arguments optional

export type ElectronIPC = {
  openFile: (args?: OpenDialogProps) => Promise<string>;
  openDirectory: (args?: OpenDialogProps) => Promise<string>;
  selectEpubPath: () => Promise<string>;
  selectAudioFilePath: () => Promise<string>;
};

export type NodeIPC = {
  isAFile: (path: string) => Promise<boolean>;
  isDirectory: (path: string) => Promise<boolean>;
};

export type UtilsIPC = {
  fileTypeValidation: (
    args: FileTypeValidationProps
  ) => Promise<FileTypeValidationRes>;
  directoryExists: (args: DirectoryExistsProps) => DirectoryExistsRes;
};

// Colleciton of types to be made accessible on the 'renderer' process:
export {
  FileTypeValidationProps,
  FileTypeValidationRes,
  DirectoryExistsProps,
  DirectoryExistsRes,
};
