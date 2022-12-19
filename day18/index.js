/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task1 = (inputs) => {
    let numSide = 0;
    const cubes = inputs.map((cube)=>cube.split(",").map((pos)=>parseInt(pos, 10)));
    for (const cube of cubes) {
        const [x, y, z] = cube;
        // top
        if(!cubes.find(([a, b, c])=> a === x && b === y+1 && c === z)) {
            numSide += 1;
        };
        // left
        if(!cubes.find(([a, b, c])=> a === x+1 && b === y && c === z)) {
            numSide += 1;
        };
        // right
        if(!cubes.find(([a, b, c])=> a === x-1 && b === y && c === z)){
            numSide += 1;
        };
        // bottom
        if(!cubes.find(([a, b, c])=> a === x && b === y-1 && c === z)){
            numSide += 1;
        };
        // front
        if(!cubes.find(([a, b, c])=> a === x && b === y && c === z-1)){
            numSide += 1;
        };
        // back
        if(!cubes.find(([a, b, c])=> a === x && b === y && c === z+1)){
            numSide += 1;
        };
    }
    return numSide;
};

const fs = require("fs");
const file = fs.readFileSync("./day18/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(task1(input));
