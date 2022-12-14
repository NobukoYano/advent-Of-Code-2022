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
                console.log("### score:", i, j, scenicScore);
                console.log("### trees", getTrees(matrix, i, j));
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
    return countNumVisibleTrees(topTrees) * 
        countNumVisibleTrees(leftTrees) * 
        countNumVisibleTrees(rightTrees) * 
        countNumVisibleTrees(bottomTrees);
}
/**
 * Debug function
 * 
 * @param {Array<Array<number>>} matrix 
 * @param {number} i 
 * @param {number} j 
 * @return {{topTrees: Array<number>, leftTrees: Array<number>, rightTrees: Array<number>, bottomTrees: Array<number>}}
 */
const getTrees = (matrix, i, j) => {
    // top
    const topTrees = matrix.slice(0, i).map((input)=>input[j]).reverse();
    // left
    const leftTrees = matrix[i].slice(0, j).reverse();
    // right
    const rightTrees = matrix[i].slice(j+1);
    // bottom
    const bottomTrees = matrix.slice(i+1).map((input)=>input[j]);
    return {topTrees, leftTrees, rightTrees, bottomTrees}
}

const countNumVisibleTrees = (arr) => {
    let count = 0;
    let localMax = 0;
    for (const tree of arr) {
        if (tree < localMax) {
            break;
        }
        count += 1;
        localMax = tree;
    }
    return count;
}

const fs = require("fs");
const file = fs.readFileSync("./day8/input.txt").toString('utf-8');
const inputs = file.split("\n")

console.log(task2(inputs));
// const matrix = inputs.map((input)=>input.split("").map((char)=>parseInt(char, 10)))
// console.log("### matrix[60][60]", getScenicScore(matrix, 60, 60));
