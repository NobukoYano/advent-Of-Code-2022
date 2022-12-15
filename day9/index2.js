/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task2 = (inputs) => {
    const tailRoadTaken = {};
    
    const rope = Array.apply(null, Array(10)).map((_)=>[0,0]);
    
    for (const input of inputs) {
        const [direction, num] = input.split(" ");
        for (let i = 0; i < num; i++) {
            move(direction, rope, tailRoadTaken);
        }
    }
    // print(tailRoadTaken);
    return Object.keys(tailRoadTaken).length;
};

const move = (direction, rope, tailRoadTaken) => {
    // Move head
    switch (direction) {
        case "U":
            rope[0][0] += 1;
            break;
        case "L":
            rope[0][1] -= 1;
            break;
        case "R":
            rope[0][1] += 1;
            break;
        case "D":
            rope[0][0] -= 1;
            break;
        default:
            break;
        
    }
    // move 1 to 9
    for (let i = 1; i < 10; i++) {
        let changedY = false;
        if (Math.abs(rope[i-1][0]-rope[i][0]) >= 2) {
            changedY = true;
            rope[i][0] = (rope[i-1][0]+rope[i][0])/2;
            if (Math.abs(rope[i-1][1]-rope[i][1]) === 1) {
                rope[i][1] = rope[i-1][1];
            }
        }
        let changedX = false;
        if (Math.abs(rope[i-1][1]-rope[i][1]) >= 2) {
            changedX = true;
            rope[i][1] = (rope[i-1][1]+rope[i][1])/2;
            if (!changedY && Math.abs(rope[i-1][0]-rope[i][0]) === 1) {
                rope[i][0] = rope[i-1][0];
            }
        }
        if (i === 9) {
            if (!tailRoadTaken[rope[i].join("*")]) {
                tailRoadTaken[rope[i].join("*")] = 1;
            } else if (changedY || changedX){
                tailRoadTaken[rope[i].join("*")] += 1;
            }
        }

    }

}

const print = (tailRoadTaken) => {
    const sortedY = Object.keys(tailRoadTaken).map((point)=> parseInt(point.split("*")[0], 10)).sort((a, b)=> a-b);
    const sortedX = Object.keys(tailRoadTaken).map((point)=> parseInt(point.split("*")[1], 10)).sort((a, b)=> a-b);
    for (let i = sortedY[sortedY.length-1]; i >= sortedY[0]; i--) {
        let row = "";
        for (let j = sortedX[0]; j <= sortedX[sortedX.length-1]; j++) {
            if (tailRoadTaken[`${i}*${j}`]) {
                row += "X";
            } else {
                row += "-";
            }
        }
        console.log(row);
        row = "";
    }
}

const fs = require("fs");
const file = fs.readFileSync("./day9/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(task2(input));
