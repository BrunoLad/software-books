let test = require('tape');
let time_parser = require('./time_parser.js');

// Backus Naur Form (BNF)
// time     ::= hour ampm           |
//              hour : minute ampm  |
//              hour : minute
//
// ampm     ::= am | pm
//
// hour     ::= digit | digit digit
//
// minute   ::= digit digit
//
// digit    ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

const h = (val) => val * 60;
const m = (val) => val;
const am = (val) => val;
const pm = (val) => val + h(12);

let tests = {
    "1am": h(1),
    "1pm": pm(h(1)),
    "2:30": h(2) + m(30),
    "14:30": pm(h(2)) + m(30),
    "2:30pm": pm(h(2)) + m(30)
};

test('time parsing', function (t) {
    for (const string in tests) {
        let result = time_parser.parse(string);
        t.equal(result, tests[string], string);
    }
    t.end();
});