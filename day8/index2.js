/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task2 = (inputs) => {
    const matrix = inputs.map((input)=>input.split("").map((char)=>parseInt(char, 10)))
    let max = 0;
    for (let i = 1; i < matrix.length - 1; i++) {
        for (let j = 1; j < matrix[0].length - 1; j++) {
            const scenicScore = getScenicScore(matrix, i, j);
            if (scenicScore > max) {
                max = scenicScore;
            }
        }
    }
    return max;
};

const getScenicScore = (matrix, i, j) => {
    // top
    const topTrees = matrix.slice(0, i).map((input)=>input[j]).reverse();
    // left
    const leftTrees = matrix[i].slice(0, j).reverse();
    // right
    const rightTrees = matrix[i].slice(j+1);
    // bottom
    const bottomTrees = matrix.slice(i+1).map((input)=>input[j]);
    return countNumVisibleTrees(topTrees, matrix[i][j]) * 
        countNumVisibleTrees(leftTrees, matrix[i][j]) * 
        countNumVisibleTrees(rightTrees, matrix[i][j]) * 
        countNumVisibleTrees(bottomTrees, matrix[i][j]);
}

const countNumVisibleTrees = (arr, num) => {
    let count = 0;
    for (const tree of arr) {
        count += 1;
        if (tree >= num) {
            break;
        }
    }
    return count;
}

const fs = require("fs");
const file = fs.readFileSync("./day8/input.txt").toString('utf-8');
const inputs = file.split("\n")

console.log(task2(inputs));
