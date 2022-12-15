/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task1 = (inputs) => {
    const tailRoadTaken = {};
    
    const H = [0, 0];
    const T = [0, 0];
    
    for (const input of inputs) {
        const [direction, num] = input.split(" ");
        for (let i = 0; i < num; i++) {
            move(direction, H, T, tailRoadTaken);
        }
    }
    return Object.keys(tailRoadTaken).length;
};

const move = (direction, head, tail, tailRoadTaken) => {
    switch (direction) {
        case "U":
            head[0] += 1;
            break;
        case "L":
            head[1] -= 1;
            break;
        case "R":
            head[1] += 1;
            break;
        case "D":
            head[0] -= 1;
            break;
        default:
            break;
        
    }
    let changed = false;
    if (Math.abs(head[0]-tail[0]) >= 2) {
        changed = true;
        tail[0] = (head[0]+tail[0])/2;
        if (Math.abs(head[1]-tail[1]) === 1) {
            tail[1] = head[1];
        }
    }
    if (Math.abs(head[1]-tail[1]) >= 2) {
        changed = true;
        tail[1] = (head[1]+tail[1])/2;
        if (Math.abs(head[0]-tail[0]) === 1) {
            tail[0] = head[0];
        }
    }
    if (!tailRoadTaken[tail.join("-")]) {
        tailRoadTaken[tail.join("-")] = 1;
    } else if (changed){
        tailRoadTaken[tail.join("-")] += 1;
    }

}

const fs = require("fs");
const file = fs.readFileSync("./day9/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(task1(input));
