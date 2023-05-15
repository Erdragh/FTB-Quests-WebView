import { lstat, readFile, readdir } from "fs/promises";
import snbtToJS from "./quest-parser.js";

const content: Buffer = await readFile("../../../Create-Astral/config/ftbquests/data.snbt");

parseDirectory("../../../Create-Astral/config/ftbquests/")

async function parseDirectory(baseDir: string) {
    for (let file of await readdir(baseDir)) {
        const fileData = (await lstat(baseDir + file));
        if (fileData.isDirectory()) {
            await parseDirectory(baseDir + file + "/");
        } else {
            console.log(file);
            console.log(snbtToJS(String(await readFile(baseDir + file)), file));
        }
    }
}

