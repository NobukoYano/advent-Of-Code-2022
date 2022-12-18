const sampleResult = [
    [0,0],
    [1,0],
    [1,1],
    [2,1],
    [2,2],
    [3,2],
    [4,2],
    [4,3],
    [4,4],
    [4,5],
    [4,6],
    [4,7],
    [3,7],
    [2,7],
    [1,7],
    [0,7],
    [0,6],
    [0,5],
    [0,4],
    [0,3],
    [1,3],
    [2,3],
    [3,3]
]

const result = [];
let min = 0;
let counter = 0


/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task1 = (inputs) => {
    const matrix = inputs.map((input)=>input.split(""));
    min = matrix.length * matrix[0].length;

    let current = find(matrix, "S");
    move({matrix, current, steps: 1});
    // console.log("### result", result.sort((a,b)=> a-b)[0]);
    console.log("### min", min);
};

const find = (matrix, target) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === target) {
                return [i, j];
            }
        }
    }
}

const isMostOneHigher = (a, b) => (a.charCodeAt(0) + 1 - b.charCodeAt(0))  >= 0;

const isMovable = (a, b, aMax, bMax, curr, target) => {
    const newTarget = target === "E" ? "z" : target;
    return a >= 0 && a <= aMax &&
        b >= 0 && b <= bMax &&
        target && 
        target !== "X" &&
        isMostOneHigher(curr, newTarget);
};

const move = ({matrix, current, steps}) => {
    // console.log("###################", current, steps);
    counter += 1;
    if (counter >= 100) return;
    const [posY, posX] = current;
    const aMax = matrix.length - 1;
    const bMax = matrix[0].length - 1;
    let currentHeight = matrix[posY][posX];
    if (min <= (steps - 1)) return;
    if (currentHeight === "E") {
        console.log("##### goal", steps - 1);
        console.log("##### min", min);
        if (min > (steps - 1)) {
            min = steps - 1;
        }
    }
    if (currentHeight === "S") {
        currentHeight = "a";
    }

    [[posY - 1, posX], [posY + 1, posX], [posY, posX - 1], [posY, posX + 1]].forEach((newPos)=>{
        if (isMovable(newPos[0], newPos[1], aMax, bMax, currentHeight, matrix?.[newPos[0]]?.[newPos[1]])){
            const newMatrix = matrix.map((row)=> [...row]);
            newMatrix[posY][posX] = "X";
            move({matrix: newMatrix, current: [...newPos], steps: steps+1});
        }
    })

}


const fs = require("fs");
const file = fs.readFileSync("./day12/input.txt").toString('utf-8');
const input = file.split("\n")

task1(input);
// console.log(result.map((item)=>({steps: item.length, item})).sort((a, b)=> a.steps - b.steps)[0]);
