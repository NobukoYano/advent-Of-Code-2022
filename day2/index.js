/**
 * day 2 - first
 * @param {Array<number>} texts
 */
const calculate = (inputs) => {
    // Check the number of items which are bigger than previous value
    const position = inputs.reduce((acc, item)=>{
        const [direction, number] = item.split(" ");
        // console.log("####", direction, number);
        if (direction === "forward") {
            acc.horizontal = acc.horizontal + parseInt(number);
            // acc.depth = acc.depth * parseInt(number);
        }
        if (direction === "down") {
            acc.depth = acc.depth + parseInt(number);
        }

        if (direction === "up") {
            acc.depth = acc.depth - parseInt(number);
        }
        return acc;

    }, {horizontal: 0, depth: 0});
    return position.horizontal * position.depth;

};

const fs = require("fs");
const file = fs.readFileSync("./day2/sample.txt").toString('utf-8');
const input = file.split("\n")

console.log(calculate(input));
