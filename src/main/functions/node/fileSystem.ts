import * as fs from "node:fs";

export function isAFile(path: string): boolean {
  let stats;
  try {
    stats = fs.statSync(path);
  } catch (err: unknown) {
    // path is neither a file path nor a directory path
  }
  return stats ? stats.isFile() : false;
}

export function isDirectory(path: string): boolean {
  let stats;
  try {
    stats = fs.statSync(path);
  } catch (err: unknown) {
    // path is neither a file path nor a directory path
  }
  return stats ? stats.isDirectory() : false;
}
