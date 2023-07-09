const fs = require('fs');
const path = require('path');
const { listDirectory } = require('./directory_listing');

jest.mock('fs', () => ({
    promises: {
        readdir: jest.fn(),
        stat: jest.fn()
    },
}));
jest.mock('path');

let tests = {
    file: {
        description: 'should handle file and produce parent directory listing',
        stat: {
            isFile: () => true,
        },
        param: 'originalFile.txt',
        dirName: 'parentDir/',
        listing: ['originalFile.txt', 'random.js', 'butterfly.ini'],
    },
    directory: {
        description: 'should handle and produce directory listing',
        stat: {
            isFile: () => false,
        },
        param: 'originalDir/',
        dirName: 'originalDir/',
        listing: ['pandas.py', 'bee.ini'],
    },
};

describe('listDirectory', () => {
    beforeAll(() => {
        // clear any previous calls
        fs.promises.stat.mockClear();
        fs.promises.readdir.mockClear();
        path.dirname.mockClear();
    });

    for (let test in tests) {
        it(tests[test].description, async () => {
            fs.promises.stat.mockReturnValue(Promise.resolve(tests[test].stat));
            fs.promises.readdir.mockReturnValue(
                Promise.resolve(tests[test].listing)
            );
            path.dirname.mockReturnValue(tests[test].dirName);

            const result = await listDirectory(tests[test].param);

            expect(result.directory).toEqual(tests[test].dirName);
            expect(result.listing).toEqual(tests[test].listing);
        });
    }
});
