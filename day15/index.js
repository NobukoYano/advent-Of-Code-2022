/**
 * day 15 - first
 * @param {Array<string>} input
 * @return {number}
 */
const calculate = (input) => {
    console.log("###", input);

    // create all pattern of routes
    const minSum = createRoutes(0, 0, 0, input[0].length-1, input.length-1, input, 90000);
    console.log("### Min risk:", minSum);
    return -1;
};

9*100*100
const createRoutes = (sum, x, y, maxX, maxY, input, minSum) => {
    const routes = [];
    if (x >= maxX && y >= maxY) {
        if (sum < minSum) return sum;
        return minSum;
    } else if (x >= maxX) {
        const yAdd = y+1;
        return createRoutes(sum+input[yAdd][x], x, yAdd, maxX, maxY, input, minSum);

    } else if (y >= maxY) {
        const xAdd = x+1;
        return createRoutes(sum+input[y][xAdd], xAdd, y, maxX, maxY, input, minSum);
    } else {
        const xAdd = x+1;
        const yAdd = y+1;
        if (input[yAdd][x] > (input[y][xAdd] + 2)) {
            return createRoutes(sum+input[y][xAdd], xAdd, y, maxX, maxY, input, minSum);
        } else if (input[y][xAdd] > (input[yAdd][x] + 2)) {
            return createRoutes(sum+input[yAdd][x], x, yAdd, maxX, maxY, input, minSum);
        } else {
            return Math.min(createRoutes(sum+input[yAdd][x], x, yAdd, maxX, maxY, input, minSum), createRoutes(sum+input[y][xAdd], xAdd, y, maxX, maxY, input, minSum));
        }
    }

};

const fs = require("fs");
const file = fs.readFileSync("./day15/input.txt").toString('utf-8');
const input = file.split("\n").map((row)=>row.split("").map((char)=>parseInt(char)));

console.log(calculate(input));
