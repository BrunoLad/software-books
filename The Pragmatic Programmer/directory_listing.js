const { readdir, stat } = require('fs').promises;
const path = require('path');

exports.listDirectory = async function (param) {
    let stats;
    let parent = param;

    try {
        stats = await stat(param);
    } catch (error) {
        if (error.code !== 'ENOENT') throw error;
        else throw new Error('Error processing path');
    }

    if (stats.isFile())
        parent = path.dirname(param);

    const listing = await readdir(parent);

    return new DirectoryListing(parent, listing);
};

class DirectoryListing {
    #directory;
    #listing;
    constructor(directory, listing) {
        this.#directory = directory;
        this.#listing = listing;
    }

    get directory() {
        return this.#directory;
    }

    get listing() {
        return this.#listing;
    }

    set directory(directory) {
        this.#directory = directory;
    }

    set listing(listing) {
        this.#listing = listing;
    }
}
