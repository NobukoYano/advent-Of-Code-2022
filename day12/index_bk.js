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

/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task1 = (inputs) => {
    
    const matrix = inputs.map((input)=>input.split(""));
    min = matrix.length * matrix[0].length;

    let current = find(matrix, "S");
    move({matrix, current, takenPath:[[0, 0]]});
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

const isMovable = (a, b, aMax, bMax, curr, target, takenPath) => {
    const newTarget = target === "E" ? "z" : target;
    return a >= 0 && a <= aMax &&
        b >= 0 && b <= bMax &&
        target && 
        isMostOneHigher(curr, newTarget) && 
        !takenPath.find((path)=>path[0] === a && path[1] === b)};

const move = ({matrix, current, takenPath}) => {
    const [posY, posX] = current;
    const aMax = matrix.length - 1;
    const bMax = matrix[0].length - 1;
    let currentHeight = matrix[posY][posX];
    if (min <= (takenPath.length - 1)) return;
    if (currentHeight === "E") {
        // console.log("########### result", takenPath.length, takenPath);
        if (min > (takenPath.length - 1)) {
            min = takenPath.length - 1;
        }
        // result.push(takenPath.length - 1);
    }
    if (currentHeight === "S") {
        currentHeight = "a";
    }

    // up
    const up = posY - 1;
    // Check if movable to up
    if (isMovable(up, posX, aMax, bMax, currentHeight, matrix?.[up]?.[posX], takenPath)){
        const newPosition = [up, posX]
        const newTakenPath = [...takenPath, newPosition];
        move({matrix, current:newPosition, takenPath: newTakenPath});
    }
    // down
    const down = posY + 1;
    // Check if movable to up
    if (isMovable(down, posX, aMax, bMax, currentHeight, matrix?.[down]?.[posX], takenPath)){
        const newPosition = [down, posX]
        const newTakenPath = [...takenPath, newPosition];
        move({matrix, current:newPosition, takenPath: newTakenPath});
    }
    // left
    const left = posX - 1;
    // Check if movable to up
    if (isMovable(posY, left, aMax, bMax, currentHeight, matrix?.[posY]?.[left], takenPath)){
        const newPosition = [posY, left]
        const newTakenPath = [...takenPath, newPosition];
        move({matrix, current:newPosition, takenPath: newTakenPath});
    }
    // right
    const right = posX + 1;
    // Check if movable to up
    if (isMovable(posY, right, aMax, bMax, currentHeight, matrix?.[posY]?.[right], takenPath)){
        const newPosition = [posY, right]
        const newTakenPath = [...takenPath, newPosition];
        move({matrix, current:newPosition, takenPath: newTakenPath});
    }
}


const fs = require("fs");
const file = fs.readFileSync("./day12/sample.txt").toString('utf-8');
const input = file.split("\n")

task1(input);
// console.log(result.map((item)=>({steps: item.length, item})).sort((a, b)=> a.steps - b.steps)[0]);
