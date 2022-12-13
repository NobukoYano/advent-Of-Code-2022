const scoreMap = [
    ["A", "X", 3], // loose with Z: 3 + 0
    ["A", "Y", 4], // draw  with X: 1 + 3
    ["A", "Z", 8], // win   with Y: 2 + 6
    ["B", "X", 1], // loose with X: 1 + 0
    ["B", "Y", 5], // draw  with Y: 2 + 3
    ["B", "Z", 9], // win   with Z: 3 + 6 
    ["C", "X", 2], // loose with Y: 2 + 0
    ["C", "Y", 6], // draw  with Z: 3 + 3
    ["C", "Z", 7], // win   with X: 1 + 6
]
// X: loose, Y: draw, Z: win
/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task2 = (inputs) => {
    let score = 0
    for (const input of inputs) {
        score += scoreMap.find((score) => score[0] === input[0] && score[1] === input[2])[2];
    }
    return score;
};

const fs = require("fs");
const file = fs.readFileSync("./day2/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(task2(input));
