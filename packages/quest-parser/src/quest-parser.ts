import { writeFileSync } from "fs";
import { mkdir } from "fs/promises";

export default async function snbtToJS(snbt: string, filename = "out"): Promise<any> {
    // add double quotes around identifiers
    let jsonStr = snbt.replace(/(?<!".*)(\w+:)|(\w+ :)/g, (matchedStr) => '"' + matchedStr.substring(0, matchedStr.length - 1) + '":');
    // remove type decorator from floating point numbers
    jsonStr = jsonStr.replace(/\d+(\.\d+)?[dfbsL]/g, str => str.substring(0, str.length - 1));
    // add commas after each line
    jsonStr = jsonStr.split("\n").filter(str => str.length > 0).map(str => str.charAt(str.length - 1) === "[" || str.charAt(str.length - 1) === "{" || str.length < 2 ? str : (str + ",")).join("\n");
    // remove trailing commas
    jsonStr = jsonStr.replace(/\,(?!\s*?[\{\[\"\'\w])/g, '');

    const writeString = "./generated_json/" + filename + ".json";

    await mkdir(writeString.split("/").slice(0, -1).join("/"), {
        recursive: true
    });

    writeFileSync(writeString, jsonStr);

    return JSON.parse(jsonStr);
}