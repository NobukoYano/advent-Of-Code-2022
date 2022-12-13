/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task1 = (inputs) => {
    let count = 0;
    for (const input of inputs) {
        const sections = input.split(",").map((section)=>section.split("-").map((item)=>parseInt(item)));
        if (checkFullOverlap(sections)) {
            count += 1;
        }
    }
    return count;
};

const checkFullOverlap = (sections) => ((sections[0][0] <= sections[1][0] && sections[0][1] >= sections[1][1]) || (sections[0][0] >= sections[1][0] && sections[0][1] <= sections[1][1]));


const fs = require("fs");
const file = fs.readFileSync("./day4/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(task1(input));
