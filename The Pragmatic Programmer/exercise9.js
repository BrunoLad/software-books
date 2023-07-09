let test = require('tape');

function makeInteger(o, base = 10) {
    return parseInt(o, base);
}

function getMinutes(input) {
    const am = () => 0;
    const pm = () => 12 * 60;
    let minutes = 0;
    const regex = /(1[0-2]|\d)(?::([0-5][0-9]))?(pm|am)|([0-1]\d|2[0-3]|\d):([0-5][0-9])/i;
    const result = regex.exec(input);
    
    if (!result) return minutes;

    if (result[1]) {
        minutes += makeInteger(result[1]) * 60;

        minutes += makeInteger(result[2]) || 0;

        minutes += eval(result[3].toLowerCase())();
    }

    if (result[4]) {
        minutes += (makeInteger(result[4]) * 60) + makeInteger(result[5]);
    }

    return minutes;
}

const h = (val) => val * 60;
const m = (val) => val;
const amt = (val) => val;
const pmt = (val) => val + h(12);

let tests = {
    "1am": h(1),
    "1pm": pmt(h(1)),
    "2:30": h(2) + m(30),
    "14:30": pmt(h(2)) + m(30),
    "2:30pm": pmt(h(2)) + m(30)
};

test('time parsing', function (t) {
    for (const string in tests) {
        let result = getMinutes(string);
        t.equal(result, tests[string], string);
    }
    t.end();
});