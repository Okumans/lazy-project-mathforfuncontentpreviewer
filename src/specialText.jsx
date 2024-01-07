import Latex from "react-latex"

export class SpecialText {
    constructor(content, isLatex = false, classes = "") {
        this.rawContent = content;
        this.isLatex = isLatex;
        this.classes = classes;
    }

    get content() {
        return <div className="flex gap-1 flex-wrap items-baseline">
            {this.rawContent.split(/(\$.*?\$)/).map((textElement) => {
                if (textElement.startsWith("$") && textElement.endsWith("$")) {
                    return <p className={this.classes + " font-sans"}>{this.isLatex ? <Latex>{textElement}</Latex> : textElement} </p>
                }
                else {
                    return <p className={this.classes}> {textElement} </p>
                }
            })
            }
        </div>
    }

    get contentNoStyle() {
        return this.isLatex ? <Latex>{this.rawContent}</Latex> : this.rawContent;
    }

    // toString() {
    //     return `SpecialText.fromString('${this.rawContent}'${this.isLatex ? ", " + this.isLatex: ""}${this.isLatex ? ", " + this.content: ""})`
    // }

    static fromString(str, isLatex = false, style = "") {
        return new SpecialText(str, isLatex, style);
    }

    static toSpecialTextIfNotUndefined = (text) => {
        switch (typeof text) {
            case 'string':
                return SpecialText.fromString(text);
            case 'object':
                if (text instanceof SpecialText)
                    return text;
                else if (text.rawContent || text.isLatex || text.classes)
                    return new SpecialText(text.rawContent || "", text.isLatex || false, text.classes || "")
            default:
                return text;
        }
    }
    
    static recursiveNestToSpecialText = (arr) => {
        Array.isArray(arr) && arr.forEach((element, index, array) => {
            if (Array.isArray(element)) {
                SpecialText.recursiveNestToSpecialText(element);
            } else {
                array[index] = SpecialText.toSpecialTextIfNotUndefined(element);
            }
        });
    }

    // toJSON() {
    //     return `SpecialText.fromString('${this.rawContent}'${this.isLatex ? ", " + this.isLatex: ""}${this.isLatex ? ", " + this.content: ""})`
    // }

    static parseJSON = (elements) => {

        function esp(text) {
            const values = [];
            let level = 0;
            let current = '';
            
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                if (char === '(') {
                    if (level > 0) {
                        current += char;
                    }
                    level++;
                } else if (char === ')') {
                    level--;
                    if (level === 0) {
                        values.push(current);
                        current = '';
                    } else {
                        current += char;
                    }
                } else {
                    if (level > 0) {
                        current += char;
                    }
                }
            }
        
            return values;
        }
        


        if (Array.isArray(elements)) {
            return elements.map((element) => this.parseJSON(element));
        }
        else if (typeof elements === 'object') {
            const { rawContent, isLatex, classes } = elements;
            if (rawContent || isLatex || classes) {
                return new SpecialText(rawContent, isLatex, classes);
            }
        }
        else if (typeof elements === 'string') {
            const matches = esp(elements);
            console.log(matches);
            if (matches.length > 0)
                return new SpecialText(matches[0] || "", (matches[1] === "true") || false, matches[2] || "")
            return new SpecialText(elements);
        }
        return undefined;
    }

}
