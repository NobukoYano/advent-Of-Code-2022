/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task2 = (input) => {
    const encryptedFile = input.map((el)=>parseInt(el, 10));

};

const fs = require("fs");
const file = fs.readFileSync("./day18/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(task2(input));
