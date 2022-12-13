/**
 * day X - second
 * @param {Array<string>} inputs
 * @return {number}
 */
const findTopThreeCaloriesElf = (inputs) => {
    let max = [];
    let localSum = 0;
    for (const calory of inputs) {
        const caloryNum = parseInt(calory, 0);
        if (!caloryNum) {
            max.push(localSum);
            localSum = 0;
        } else {
            localSum += caloryNum
        }
    }
    max.push(localSum);
    return max.sort((a, b)=> a - b).slice(-3).reduce((acc, curr)=> acc+curr, 0);
};

const fs = require("fs");
const file = fs.readFileSync("./day1/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(findTopThreeCaloriesElf(input));
