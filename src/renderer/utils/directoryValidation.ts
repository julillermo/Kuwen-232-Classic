// import { isDirectory } from "../node/fileSystem";
const { node } = window;

export type DirectoryExistsProps = {
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

  if (directoryPath.length > 0) {
    let isADirectory;
    try {
      isADirectory = await node.isDirectory(directoryPath);
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
