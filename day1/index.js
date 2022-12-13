/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const findMostCaloriesElf = (inputs) => {
    let max = 0;
    let localSum = 0;
    for (const calory of inputs) {
        const caloryNum = parseInt(calory, 0);
        if (!caloryNum) {
            if (localSum > max) {
                max = localSum;
            }
            localSum = 0;
        } else {
            localSum += caloryNum
        }
    }
    return max;
};

const fs = require("fs");
const file = fs.readFileSync("./day1/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(findMostCaloriesElf(input));
