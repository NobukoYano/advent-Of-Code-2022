/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task1 = (inputs) => {
    const matrix = inputs.map((input)=>input.split("").map((char)=>parseInt(char, 10)))
    let count = matrix.length * 2 + matrix[0].length * 2 - 4; // trees on the edge
    for (let i = 1; i < matrix.length - 1; i++) {
        for (let j = 1; j < matrix[0].length - 1; j++) {
            if (isVisible(matrix, i, j)) {
                count += 1;
            }
        }
    }
    return count;
};

const isVisible = (matrix, i, j) => {
    // top
    const topTrees = matrix.slice(0, i).map((input)=>input[j]);
    // left
    const leftTrees = matrix[i].slice(0, j);
    // right
    const rightTrees = matrix[i].slice(j+1);
    // bottom
    const bottomTrees = matrix.slice(i+1).map((input)=>input[j]);

    return topTrees.every((hight)=> hight < matrix[i][j]) ||  
        leftTrees.every((hight)=> hight < matrix[i][j]) ||
        rightTrees.every((hight)=> hight < matrix[i][j]) ||
        bottomTrees.every((hight)=> hight < matrix[i][j]);
}


const fs = require("fs");
const file = fs.readFileSync("./day8/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(task1(input));
