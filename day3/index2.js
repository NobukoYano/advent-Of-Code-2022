/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task2 = (inputs) => {
    const duplicates = [];
    let i = 0;
    while (i < (inputs.length - 2)) {
        duplicates.push(findCommonChar(inputs[i], inputs[i+1], inputs[i+2]));
        i += 3;
    }
    return duplicates.reduce((acc, curr)=> acc + getPriority(curr), 0);
};

const findCommonChar = (a, b, c) => {
    for (const char of a) {
        if (b.indexOf(char) !== -1) {
            if (c.indexOf(char) !== -1) {
                return char;
            }
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

console.log(task2(input));
