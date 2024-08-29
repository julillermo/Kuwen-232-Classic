import { isDirectory } from "./fileSystem";

export type DirectoryExistsProps = {
  directoryPath: string;
  booleanResult?: boolean;
};
type DirectoryExistsStatus = "validPath" | "invalidPath" | "emptyPath";
export type DirectoryExistsRes = DirectoryExistsStatus | boolean | undefined;

export default function directoryExists({
  directoryPath,
  booleanResult = false,
}: DirectoryExistsProps): DirectoryExistsRes {
  let validationResult: DirectoryExistsRes;

  if (directoryPath.length > 0) {
    let isADirectory;
    try {
      isADirectory = isDirectory(directoryPath);
    } catch (err: unknown) {
      isADirectory = false;
    }

    if (booleanResult) {
      isADirectory ? (validationResult = true) : (validationResult = false);
    } else {
      isADirectory
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

  return validationResult;
}
