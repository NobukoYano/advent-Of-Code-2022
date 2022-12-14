/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task2 = (inputs) => {
    const {stacks, procedures} = formatInput(inputs);
    for (const procedure of procedures) {
        // pop and push
        const removed = stacks[procedure.from-1].splice(0, procedure.move);
        stacks[procedure.to-1].unshift(...removed);
    }
    return stacks.map((crane)=>crane[0]).join("");
};

const formatInput = (inputs) => {
    const numberOfStacks = (inputs[0].length + 1) / 4;
    const stacks = Array.from(Array(numberOfStacks)).map((_)=>[]);
    const procedures = []
    let cranes = true;
    for (const input of inputs) {
        if (input[1] === "1") cranes = false;
        if (cranes) {
            for (let i = 0; i < numberOfStacks; i++) {
                if (input[i*4+1].trim()) {
                    stacks[i].push(input[i*4+1])
                }
            }
        }
        if (input[0] === "m") {
            const [move, from, to] = input.replace("move ", "").replace("from ", "").replace("to ", "").split(" ")
            procedures.push({move: parseInt(move, 10), from: parseInt(from, 10), to: parseInt(to, 10)});
        }
    }
    return {stacks, procedures};
};


const fs = require("fs");
const file = fs.readFileSync("./day5/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(task2(input));
