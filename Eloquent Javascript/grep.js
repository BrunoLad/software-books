const { stat, readdir, readFile } = require('fs').promises;

// First actual command line argument
let regex = process.argv[2];

if (!regex) throw new Error('Regex pattern must be provided.');

let files = process.argv.slice(3);
if (!files.length) throw new Error('At least one file or directory must be provided');

files.forEach(async f => {
    await readBlob(f);
});

async function readBlob(file) {
    let stats;
    try {
        stats = await stat(file);
    } catch (error) {
        if (error.code !== 'ENOENT') throw error;
        else console.log('File not found');
    }

    if (stats.isDirectory()) {
        const dirFiles = await readdir(file);
        for (let f of dirFiles) {
            await readBlob(`${file}/${f}`);
        }
    } else {
        readFile(file, "utf-8").then((data) => {
            if (data.match(regex)) console.log(file);
        });
    }
}