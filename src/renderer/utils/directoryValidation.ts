import { fileSystemIPC } from "../types/globalNamesAddition";
const { fileSystem } = window;

type DirectoryExistsProps = {
  directoryPath: string;
  booleanResult?: boolean;
};
type DirectoryExistsStatus = "validPath" | "invalidPath" | "emptyPath";
export type DirectoryExistsRes = DirectoryExistsStatus | boolean | undefined;

export default async function directoryExists({
  directoryPath,
  booleanResult = false,
}: DirectoryExistsProps): Promise<DirectoryExistsRes> {
  let validationResult: DirectoryExistsRes;

  console.log("directoryPath", directoryPath);
  console.log("directoryPath", directoryPath);

  if (directoryPath.length > 0) {
    let isDirectory;
    try {
      isDirectory = await fileSystem.isDirectory(directoryPath);
    } catch (err: unknown) {
      isDirectory = false;
    }

    if (booleanResult) {
      isDirectory ? (validationResult = true) : (validationResult = false);
    } else {
      isDirectory
        ? (validationResult = "validPath")
        : (validationResult = "invalidPath");
    }
  } else {
    if (booleanResult) {
      validationResult = undefined;
    } else {
      validationResult = "emptyPath";
    }
  }

  console.log("validationResult", validationResult);

  return validationResult;
}

// Types for IPC functions
declare global {
  interface Window {
    fileSystem: fileSystemIPC;
  }
}
