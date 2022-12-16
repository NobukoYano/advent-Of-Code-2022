/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task1 = (inputs) => {
    let cycle = 1;
    let x = 1;
    let totalSignalStrength = 0;
    for (const input of inputs) {
        // console.log("### input - cycle", input, cycle);
        if ((cycle + 20) % 40 === 0) {
            console.log("### cycle", cycle);
            console.log("### signal strength", cycle * x);
            totalSignalStrength += cycle * x;
        }
        const [command, num] = input.split(" ");
        switch (command) {
            case "noop":
                cycle += 1;
                break;
            case "addx":
                cycle += 1;
                if ((cycle + 20) % 40 === 0) {
                    console.log("### cycle", input, cycle, x);
                    console.log("### signal strength", cycle * x);
                    totalSignalStrength += cycle * x;
                }
                cycle += 1;
                x += parseInt(num, 10);
                break;
            default:
                break;
        }
    }
    return totalSignalStrength;
};


const fs = require("fs");
const file = fs.readFileSync("./day10/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(task1(input));
