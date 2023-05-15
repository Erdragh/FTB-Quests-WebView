import { lstat, readFile, readdir } from "fs/promises";
import snbtToJS from "./quest-parser.js";

parseDirectory("../../../Create-Astral/config/ftbquests/")

async function parseDirectory(baseDir: string) {
    for (let file of await readdir(baseDir)) {
        const fileData = (await lstat(baseDir + file));
        if (fileData.isDirectory()) {
            await parseDirectory(baseDir + file + "/");
        } else {
            console.log(file);
            let pathI: number = -1;
            console.log(await snbtToJS(String(await readFile(baseDir + file)), baseDir.split("/").filter((dir, i, arr) => {
                return (arr.slice(0, i).find(val => val === "Create-Astral"))
            }).join("/") + file));
        }
    }
}

