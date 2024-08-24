import mime from "mime";
import { fileSystemIPC } from "../types/globalNamesAddition";
const { fileSystem } = window;

type FileTypeValidationProps = {
  filePath: string;
  targetFileExtensions: string | string[];
  booleanResult?: boolean;
};
type FileTypeValidationStatus = "validPath" | "invalidPath" | "emptyPath";
export type FileTypeValidationRes =
  | FileTypeValidationStatus
  | boolean
  | undefined;
type CheckIfFileType = {
  filePath: string;
  targetFileExtensions: string | string[];
};

async function checkIfFile(filePath: string): Promise<boolean> {
  let isFile = false;
  try {
    isFile = await fileSystem.isFile(filePath);
  } catch (err: unknown) {
    isFile = false;
  }
  return isFile;
}

function checkIfFileType({
  filePath,
  targetFileExtensions,
}: CheckIfFileType): boolean {
  let isFileType = false;
  let mimeTypesList: string[] = [];

  if (typeof targetFileExtensions == "string") {
    mimeTypesList = COMMON_MIME_TYPES[targetFileExtensions];
  } else if (typeof targetFileExtensions == "object") {
    mimeTypesList = targetFileExtensions
      .map((fileExt) => {
        return COMMON_MIME_TYPES[fileExt];
      })
      .flat();
  }

  const filePathMimeType = mime.getType(filePath);
  filePathMimeType && (isFileType = mimeTypesList.includes(filePathMimeType));

  return isFileType;
}

export default async function fileTypeValidation({
  filePath,
  targetFileExtensions,
  booleanResult = false,
}: FileTypeValidationProps): Promise<FileTypeValidationRes> {
  let validationResult: FileTypeValidationRes;

  if (filePath.length > 0) {
    const isFile = await checkIfFile(filePath);
    const isFileType = checkIfFileType({ filePath, targetFileExtensions });

    if (booleanResult) {
      isFile && isFileType
        ? (validationResult = true)
        : (validationResult = false);
    } else {
      isFile && isFileType
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

// Taken from https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
// "File Extension" : [MIME Types]
const COMMON_MIME_TYPES: {
  [key: string]: string[];
} = {
  aac: ["audio/aac"],
  abw: ["application/x-abiword"],
  apng: ["image/apng"],
  arc: ["application/x-freearc"],
  avif: ["image/avif"],
  avi: ["video/x-msvideo"],
  azw: ["application/vnd.amazon.ebook"],
  bin: ["application/octet-stream"],
  bmp: ["image/bmp"],
  bz: ["application/x-bzip"],
  bz2: ["application/x-bzip2"],
  cda: ["application/x-cdf"],
  csh: ["application/x-csh"],
  css: ["text/css"],
  csv: ["text/csv"],
  doc: ["application/msword"],
  docx: [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  eot: ["application/vnd.ms-fontobject"],
  epub: ["application/epub+zip"],
  gz: ["application/gzip", "application/x-gzip"],
  gif: ["image/gif"],
  htm: ["text/html"],
  html: ["text/html"],
  ico: ["image/vnd.microsoft.icon"],
  ics: ["text/calendar"],
  jar: ["application/java-archive"],
  jpeg: ["image/jpeg"],
  jpg: ["image/jpeg"],
  js: ["text/javascript"],
  json: ["application/json"],
  jsonld: ["application/ld+json"],
  mid: ["audio/midi", "audio/x-midi"],
  midi: ["audio/midi", "audio/x-midi"],
  mjs: ["text/javascript"],
  mp3: ["audio/mpeg"],
  mp4: ["video/mp4"],
  mpeg: ["video/mpeg"],
  mpkg: ["application/vnd.apple.installer+xml"],
  odp: ["application/vnd.oasis.opendocument.presentation"],
  ods: ["application/vnd.oasis.opendocument.spreadsheet"],
  odt: ["application/vnd.oasis.opendocument.text"],
  oga: ["audio/ogg"],
  ogv: ["video/ogg"],
  ogx: ["application/ogg"],
  opus: ["audio/ogg"],
  otf: ["font/otf"],
  png: ["image/png"],
  pdf: ["application/pdf"],
  php: ["application/x-httpd-php"],
  ppt: ["application/vnd.ms-powerpoint"],
  pptx: [
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ],
  rar: ["application/vnd.rar"],
  rtf: ["application/rtf"],
  sh: ["application/x-sh"],
  svg: ["image/svg+xml"],
  tar: ["application/x-tar"],
  tif: ["image/tiff"],
  tiff: ["image/tiff"],
  ts: ["video/mp2t"],
  ttf: ["font/ttf"],
  txt: ["text/plain"],
  vsd: ["application/vnd.visio"],
  wav: ["audio/wav"],
  weba: ["audio/webm"],
  webm: ["video/webm"],
  webp: ["image/webp"],
  woff: ["font/woff"],
  woff2: ["font/woff2"],
  xhtml: ["application/xhtml+xml"],
  xls: ["application/vnd.ms-excel"],
  xlsx: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  xml: ["application/xml", "text/xml"],
  xul: ["application/vnd.mozilla.xul+xml"],
  zip: ["application/zip", "x-zip-compressed"],
  "3gp": ["video/3gpp", "audio/3gpp"],
  "3g2": ["video/3gpp2", "audio/3gpp2"],
  "7z": ["application/x-7z-compressed"],
};

// Types for IPC functions
declare global {
  interface Window {
    fileSystem: fileSystemIPC;
  }
}
