import { IpcMainInvokeEvent } from "electron";
import JSZip from "jszip";
import * as fs from "node:fs";

export async function readZip(_: IpcMainInvokeEvent, filePath: string) {
  fs.readFile(filePath, async (err, data) => {
    if (err) {
      throw err;
    }
    const zipFile = await JSZip.loadAsync(data);
    const htmlFile = zipFile.file(
      "OEBPS/1993825213255558943_2701-h-0.htm.xhtml"
    );
    const htmlContents = await htmlFile?.async("string");
    console.log(htmlContents);
    console.log(htmlContents?.length);
  });
}
