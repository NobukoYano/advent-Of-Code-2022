/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task1 = (inputs) => {
    const duplicates = [];
    for (const input of inputs) {
        const first = input.substring(0, input.length/2);
        const second = input.substring(input.length/2);
        duplicates.push(findCommonChar(first, second));
    }
    return duplicates.reduce((acc, curr)=> acc + getPriority(curr), 0);
};

const findCommonChar = (a, b) => {
    for (const char of a) {
        if (b.indexOf(char) !== -1) {
            return char
        }
    }
}

const getPriority = (char) => {
    const temp = char.charCodeAt() - 64;
    if (temp > 27) {
        return temp - 32;
    } else {
        return temp + 26;
    }

}
const fs = require("fs");
const file = fs.readFileSync("./day3/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(task1(input));
