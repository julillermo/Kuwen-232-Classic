export type versionsIPC = {
  node: () => string;
  chrome: () => string;
  electron: () => string;
};

export type fileSystemIPC = {
  openFile: () => Promise<string>;
};
