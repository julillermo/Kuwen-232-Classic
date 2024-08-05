export type versionsIPC = {
  node: () => string;
  chrome: () => string;
  electron: () => string;
};

export type fileSystemIPC = {
  openFile: () => Promise<string>;
  openDirectory: () => Promise<string>;
  isFile: (path: string) => Promise<boolean>;
  isDirectory: (path: string) => Promise<boolean>;
  selectEpubPath: () => Promise<string>;
  selectAudioFilePath: () => Promise<string>;
};
