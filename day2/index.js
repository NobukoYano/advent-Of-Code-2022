const scoreMap = [
    ["A", "X", 4], // 1 + 3
    ["A", "Y", 8], // 2 + 6
    ["A", "Z", 3], // 3 + 0
    ["B", "X", 1], // 1 + 0
    ["B", "Y", 5], // 2 + 3
    ["B", "Z", 9], // 3 + 6
    ["C", "X", 7], // 1 + 6
    ["C", "Y", 2], // 2 + 0
    ["C", "Z", 6], // 3 + 3
]

/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task1 = (inputs) => {
    let score = 0
    for (const input of inputs) {
        score += scoreMap.find((score) => score[0] === input[0] && score[1] === input[2])[2];
    }
    return score;
};

const fs = require("fs");
const file = fs.readFileSync("./day2/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(task1(input));
