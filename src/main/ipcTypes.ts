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

// export type UtilsIPC = {};

// Colleciton of types to be made accessible on the 'renderer' process:
export {};
