import { lstat, mkdir, readFile, readdir } from "fs/promises";
import snbtToJS from "./quest-parser.js";
import { writeFileSync } from "fs";

parseDirectory("../../../Create-Astral/config/ftbquests/")

async function parseDirectory(baseDir: string) {
    for (let file of await readdir(baseDir)) {
        const fileData = (await lstat(baseDir + file));
        if (fileData.isDirectory()) {
            await parseDirectory(baseDir + file + "/");
        } else {
            console.log(file);
            const filename = baseDir.split("/").filter((dir, i, arr) => {
                return (arr.slice(0, i).find(val => val === "Create-Astral"))
            }).join("/") + file;
            const result = snbtToJS(String(await readFile(baseDir + file)), filename)

            const writeString = "./generated_json/" + filename + ".json";

            await mkdir(writeString.split("/").slice(0, -1).join("/"), {
                recursive: true
            });

            writeFileSync(writeString, JSON.stringify(result));
        }
    }
}

