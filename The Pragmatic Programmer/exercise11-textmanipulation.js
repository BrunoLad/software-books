const { readFile, writeFile } = require('fs').promises;
const { listDirectory } = require('./directory_listing');

let dir_paths = process.argv.slice(2);
const ymlExtension = new RegExp('\\.ya?ml');
const ymlMatcher = new RegExp(`(.+)${ymlExtension.source}`);

async function processParam(param) {
    const dirInfo = await listDirectory(param);
    const ymls = dirInfo.listing.filter((x) => ymlMatcher.test(x));
    ymls.forEach(async (f) => {
        const jsonFileName = f.replace(ymlExtension, '.json');
        if (dirInfo.listing.includes(jsonFileName)) {
            console.log(
                `File ${jsonFileName} already exists in directory ${dirInfo.directory}.`
            );
            console.log(`Skipping...`);
        } else {
            const result = await readFile(`${dirInfo.directory}/${f}`, 'utf-8').then((x) =>
                ymlToJson(x)
            );
            await writeJson(JSON.stringify(result, null, '\t'), dirInfo.directory, ymlMatcher.exec(f)[1]);
        }
    });
}

function ymlToJson(content) {
    const keyPattern = new RegExp('([\\w\\-]+):');
    const keyValuePattern = new RegExp(`${keyPattern.source} (.+)`);
    const lines = content.split('\n');
    const levels = lines.map((x) => x.search(/\S/));
    const json = {};

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trimStart().startsWith('#')) continue;
        const result = keyValuePattern.exec(lines[i]);

        if (result) {
            if (result[2].startsWith('[')) {
                json[result[1]] = [
                    ...result[2]
                        .slice(
                            result[2].indexOf('[') + 1,
                            result[2].lastIndexOf(']')
                        )
                        .split(',')
                        .map((x) => Number(x) || x),
                ];
            } else json[result[1]] = result[2];
        }

        if (lines[i].trimStart().startsWith('-')) {
            let elementsIndex = [i];
            const level = levels[i];
            for (let j = i + 1; j < lines.length; j++) {
                if (lines[j].trimStart().startsWith('-') && levels[j] === level)
                    elementsIndex.push(j);
            }
            const intervals = elementsIndex.map((x, i) => [x, elementsIndex[i + 1]]);
            intervals[intervals.length - 1][1] = lines.length;
            return [...intervals.map(x => ymlToJson(lines.slice(x[0], x[1]).map(x => x.replace(new RegExp(`^\\s{${level}}-`), '')).join('\n')))];
        }

        if (lines[i].endsWith(':') || lines[i].endsWith('|') || lines[i].endsWith('>')) {
            const key = keyPattern.exec(lines[i]);
            const level = levels[i];
            let end;
            for (
                end = i + 1;
                levels[end] > level;
                end++
            );
            if (lines[i].endsWith(':'))
                json[key[1]] = ymlToJson(lines.slice(i + 1, end).join('\n'));
            else if (lines[i].endsWith('|'))
                json[key[1]] = lines.slice(i + 1, end).map(x => x.trim()).join('\n');
            else if (lines[i].endsWith('>'))
                json[key[1]] = lines.slice(i + 1, end).map(x => x.trim()).join(' ');
            i += end - i - 1;
        }
    }
    return Object.keys(json).length === 0 ? lines.pop().trim() : json;
}

async function writeJson(content, dir, name) {
    const fileName = `${name}.json`;
    await writeFile(`${dir}/${fileName}`, content)
        .catch((err) =>
            console.error(`Failed to write file ${fileName}: ${err}`)
        )
        .then((result) =>
            console.log(
                `File ${fileName} saved successfully to directory ${dir}`
            )
        );
}

dir_paths.forEach(dir_path => {
    processParam(dir_path);
});
