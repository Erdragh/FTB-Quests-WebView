import { readFile } from "fs/promises";
import { QuestParser } from "./quest-parser.js";

const content: Buffer = await readFile("../../../Create-Astral/config/ftbquests/data.snbt");

const parser: QuestParser = new QuestParser(String(content));