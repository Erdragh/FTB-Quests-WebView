export class QuestParser {
    constructor(private snbt: string) {
        console.log(QuestParser.snbtToJS(snbt));
    }

    private static snbtToJS(snbt: string): any {
        // add double quotes around identifiers
        let jsonStr = snbt.replace(/(?<!"\w*)(\w+:)|(\w+ :)/g, (matchedStr) => '"' + matchedStr.substring(0, matchedStr.length - 1) + '":');
        // remove type decorator from floating point numbers
        jsonStr = jsonStr.replace(/\d+(\.\d+)?[dfbL]/g, str => str.substring(0, str.length - 1));
        // add commas after each line
        jsonStr = jsonStr.split("\n").filter(str => str.length > 0).map(str => str.charAt(str.length - 1) === "{" || str.length < 2 ? str : (str + ",")).join("\n");
        // remove trailing commas
        jsonStr = jsonStr.replace(/\,(?!\s*?[\{\[\"\'\w])/g, '');
    
        return JSON.parse(jsonStr);
    }
}