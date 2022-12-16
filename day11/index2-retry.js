const NUM_ROUND = 20;
/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task1 = (inputs) => {
    const monkeys = format(inputs);
    console.log("### monkeys", monkeys);
    for (let i = 0; i < NUM_ROUND; i++) {
        Object.entries(monkeys).forEach(([key, value])=>{
            while (value.items.length) {
                const item = monkeys[key].items.shift();
                monkeys[key].inspected += 1;
                // const newItem = Math.floor(monkeys[key].operation(item)/3);
                const newItem = monkeys[key].operation(item);
                if (newItem % monkeys[key].test == 0) {
                    monkeys[monkeys[key].true].items.push(newItem);
                } else {
                    monkeys[monkeys[key].false].items.push(newItem);
                }
            }
        })
        console.log("### round: monkeys", i, monkeys);
    }
    const sorted = Object.values(monkeys).map((monkey)=>monkey.inspected).sort((a,b)=>b-a);
    console.log("### sorted", sorted);
    return sorted[0] *sorted[1];
};

const format = (inputs) => {
    const result = {};
    let monkeyId = null;
    for (const input of inputs) {
        const [first, second, ...rest] = input.trim().split(" ");
        if (first === "Monkey") {
            monkeyId = second.replace(":", "");
            result[monkeyId] = {inspected: 0}
        }
        if (first === "Starting") {
            result[monkeyId].items = rest.map((item)=>parseInt(item.replace(",", ""), 10));
        }
        if (first === "Operation:") {
            result[monkeyId].operation = (val) => eval(`let old = ${val}; old = old ${rest[2]} ${rest[3]} ;`)

        }
        if (first === "Test:") {
            result[monkeyId].test = parseInt(rest[1], 10);
        }
        if (first === "If" && second === "true:") {
            result[monkeyId].true = rest[3];
        }
        if (first === "If" && second === "false:") {
            result[monkeyId].false = rest[3];
        }

    }
    return result;
}

const fs = require("fs");
const file = fs.readFileSync("./day11/sample.txt").toString('utf-8');
const input = file.split("\n")

console.log(task1(input));
