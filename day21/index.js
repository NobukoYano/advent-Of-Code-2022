
/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task1 = (input) => {
    const monkeys = input.map((input)=>input.split(" "));
    const rootOperation = monkeys.find((monkey)=> monkey[0] === "root:");
    eval(`let result = ${findMonkey(rootOperation[1] + ":", monkeys)}; result = result ${rootOperation[2]} ${findMonkey(rootOperation[3] + ":", monkeys)}; console.log("#### result:", result)`);
};

const findMonkey = (name, monkeys) => {
    const targetMonkey = monkeys.find((monkey)=>monkey[0] === name);
    if (targetMonkey) {
        if (targetMonkey.length === 2) {
            return targetMonkey[1];
        } else {
            return eval(`let result = ${findMonkey(targetMonkey[1] + ":", monkeys)}; result = result ${targetMonkey[2]} ${findMonkey(targetMonkey[3] + ":", monkeys)}`);
        }
    }
    return; // should not be happened
}


const fs = require("fs");
const file = fs.readFileSync("./day21/input.txt").toString('utf-8');
const input = file.split("\n")

task1(input);
