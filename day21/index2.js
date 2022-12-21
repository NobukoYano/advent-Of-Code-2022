
/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task2 = (input) => {
    const monkeys = input.map((input)=>input.split(" "));
    const rootOperation = monkeys.find((monkey)=> monkey[0] === "root:");
    console.log(`##### result ${findMonkey(rootOperation[1] + ":", monkeys)} = ${findMonkey(rootOperation[3] + ":", monkeys)}`);
};

const findMonkey = (name, monkeys) => {
    const targetMonkey = monkeys.find((monkey)=>monkey[0] === name);
    // console.log("#### name, targetMonkey", name, targetMonkey);
    if (targetMonkey) {
        if (targetMonkey[1] === "humn") {
            return `x ${targetMonkey[2]} ${findMonkey(targetMonkey[3] + ":", monkeys)}`;
        }
        if (targetMonkey.length === 2) {
            return targetMonkey[1];
        }
        const a = findMonkey(targetMonkey[1] + ":", monkeys); 
        const b = findMonkey(targetMonkey[3] + ":", monkeys);

        if ((a.toString().includes("x"))) {
            return `(${a}) ${targetMonkey[2]} ${b}`;
        }
        if ((b.toString().includes("x"))) {
            return `${a} ${targetMonkey[2]} (${b})`;
        }
        return eval(`let calc = ${a}; calc = calc ${targetMonkey[2]} ${b}`);
    }
    return; // should not be happened
}


const fs = require("fs");
const file = fs.readFileSync("./day21/input.txt").toString('utf-8');
const input = file.split("\n")

task2(input);
