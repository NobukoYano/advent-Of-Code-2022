const drawPixel = (cycle, x) => [x, x+1, x+2].includes((cycle) % 40) ? "#" : ".";
/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task1 = (inputs) => {
    let cycle = 1;
    let x = 1;
    let output = "";
    for (const input of inputs) {
        if ((cycle) % 40 === 0) {
            console.log(output);
            output = "";
        }
        const [command, num] = input.split(" ");
        switch (command) {
            case "noop":
                output += drawPixel(cycle, x);
                cycle += 1;
                break;
            case "addx":
                output += drawPixel(cycle, x);
                cycle += 1;
                if ((cycle) % 40 === 0) {
                    console.log(output);
                    output = "";
                }
                output += drawPixel(cycle, x);
                cycle += 1;
                x += parseInt(num, 10);
                break;
            default:
                break;
        }
    }
};


const fs = require("fs");
const file = fs.readFileSync("./day10/input.txt").toString('utf-8');
const input = file.split("\n")
task1(input);
