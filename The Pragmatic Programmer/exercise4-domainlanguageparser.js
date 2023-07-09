const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

class Command {
    #hasArg;
    #fun;

    constructor(hasArg, fun) {
        this.#hasArg = hasArg;
        this.#fun = fun;
    }

    get fun() {
        return this.#fun;
    }

    get hasArg() {
        return this.#hasArg;
    }

    set fun(fun) {
        this.#fun = fun;
    }

    set hasArg(hasArg) {
        this.#hasArg = hasArg;
    }
}

const directions = ['N', 'E', 'S', 'W'];
const commands = {
    P: new Command(true, (index) => selectPen(index)),
    D: new Command(false, () => startDraw()), // or pen.startDraw or pen.down
    U: new Command(false, () => endDraw()), // or pen.endDraw() or pen.up()
    ...Object.values(directions).reduce(
        (acc, curr) => ({ ...acc, [curr]: new Command(true, (len) => moveDirection(len, curr)) }),
        {}
    ),
};

function selectPen(index) {
    console.log('selectPen was called');
}
function startDraw(pen) {
    console.log('startDraw was called');
}
function endDraw(pen) {
    console.log(`endDraw was called with`);
}
function moveDirection(len, direction) {
    console.log(`moveDirection was called with ${len} and ${direction}`);
}

let input = true;

async function runRoutine() {
    while (input) {
        input = await prompt('');
        const splitInput = input.split(' ');
        let cmd = findCommand(splitInput[0]);

        if (cmd) {
            if (cmd.hasArg && !splitInput[1]) {
                console.error(`${splitInput[0]} needs an argument`);
                continue;
            }

            cmd.fun(splitInput[1]);
        } else {
            console.error('Invalid command');
        }
    }
    rl.close();
}

function findCommand(key) {
    return commands[key];
}

runRoutine();

process.on('SIGINT', () => {
    console.log('Process terminated successfully');
});
process.on('SIGTERM', () => {
    console.log('Process terminated successfully');
});