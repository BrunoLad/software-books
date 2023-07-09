const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));
const { readFile, writeFile } = require('fs').promises;
let files = process.argv.slice(2);

// using JS pattern, don't know what the book envisions as source code, if it's doing
// a universal pattern, or for specific languages. I'm focusing on js, and maybe
// defining a flag passed via cli based on language for pattern selection
const languages = {
    js: /(?<=(let|const|var)[,{\s\w]+)\b\w+\b/g,
};

async function findCamelCaseVariables(f) {
    const source = await processFiles(f);
    const variables = findVariables(source);
    const filteredVariables = filterCamelCase(variables);
    console.log(`Found the following camelCase variables in ${f}:`);
    console.table(
        filteredVariables.map((x) => ({
            variable: x.name,
            location: `L${x.line}C${x.column}`,
            suggestion: x.parts.map((y) => y.toLowerCase()).join('_'),
        }))
    );

    return { variables: filteredVariables, source };
}

async function processFiles(param) {
    const content = await readFile(param, 'utf-8');
    return content;
}

/**
 * @param {string} source - Source code of file in textual representation
 * @returns the list of variables in sourcecode and their line and column
 */
function findVariables(source) {
    const variablePattern = languages.js;
    const lines = source.split('\n');
    let match = null;
    const variables = [];
    for (let i = 0; i < lines.length; i++) {
        while ((match = variablePattern.exec(lines[i])) != null) {
            // since index and i are 0 based
            variables.push(
                new VariableLocation(match[0], i + 1, match.index + 1)
            );
        }
    }
    return variables;
}

function filterCamelCase(variables) {
    const camelCasePattern = /([a-z0-9]+)([A-Z]\w+)/;
    variables.forEach((f) => {
        const result = camelCasePattern.exec(f.name);

        if (result !== null)
            f.parts.push(result[1], ...result[2].split(/(?=[A-Z])/));
    });
    return variables.filter((f) => f.parts.length > 0);
}

// TODO: accept interactive flag -i
// and queue for user input
function toSnakeCase(source, variables) {
    // let res = source;
    return variables.reduce(
        (res, curr) =>
            res.replaceAll(
                new RegExp(`\\b${curr.name}\\b`, 'g'),
                `${curr.parts.map((y) => y.toLowerCase()).join('_')}`
            ),
        source
    );
    // variables.forEach(v => {
    //     res = res.replaceAll(new RegExp(`\\b${v.name}\\b`, 'g'), `${v.parts.map((y) => y.toLowerCase()).join('_')}`);
    // });

    // return res;
}

class VariableLocation {
    #name;
    #line;
    #column;
    parts = [];
    constructor(name, line, column) {
        this.#name = name;
        this.#line = line;
        this.#column = column;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get line() {
        return this.#line;
    }

    set line(line) {
        this.#line = line;
    }

    get column() {
        return this.#column;
    }

    set column(column) {
        this.#column = column;
    }

    toString() {
        return `Variable: ${this.#name} L${this.#line}C${this.#column}`;
    }
}

files.forEach(async (f, i, arr) => {
    const result = await findCamelCaseVariables(f);
    const response = await prompt(
        'Would you like to update variable names in source file (Y or N)?'
    );

    if (response === 'Y') {
        writeFile(`${f}.old`, result.source).then((res) =>
            console.log('File backedup successfully')
        );
        const newSource = toSnakeCase(result.source, result.variables);
        writeFile('test.js', newSource).then((res) =>
            console.log('Variables edited successfully')
        );
    }

    if (i === arr.length - 1) rl.close();
});
