const NUM_CHARS = 14;

/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task1 = (inputs) => {
    const firstMarkers = []
    for (const input of inputs) {
        for (let i = 0; i < input.length - (NUM_CHARS-1); i++) {
            if (isAllUniqueChars(input.substring(i, i+NUM_CHARS))) {
                firstMarkers.push(i+NUM_CHARS);
                break;
            }
        }
    }
    return firstMarkers;
};

const isAllUniqueChars = (str) => str.length === [...new Set(str.split(""))].length;


const fs = require("fs");
const file = fs.readFileSync("./day6/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(task1(input));
