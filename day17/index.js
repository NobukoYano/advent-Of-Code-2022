const NUM_ROCKS = 2022;

const rocks = {
    "0": [[0,2], [0,3], [0,4],[0,5]],
    "1":[[1,2], [2,3], [1,3], [0,3], [1,4]],
    "2":[[0,2], [0,3], [0,4], [1,4], [2,4]],
    "3":[[0,2], [1,2], [2,2], [3,2]],
    "4":[[0,2], [1,2], [0,3], [1,3]]

}
/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task1 = (inputs) => {
    const jetDirections = inputs[0].split("");
    let count = 0; // number of rocks to be fallen
    let gasStep = 0; // the step of the jet of fas
    const chamber = [];
    while (count < NUM_ROCKS) {
        // fall a rock
        // initial position of the rock
        let rock = rocks[count % 5].map((dot)=>[dot[0]+3+getHeighest(chamber), dot[1]]);
        let isRockFallen = false;

        while (!isRockFallen) {
            // push
            if (jetDirections[gasStep % jetDirections.length] === "<" && check(rock, chamber, "left")) {
                rock = rock.map((dot)=>[dot[0], dot[1]-1]);
            }
            if (jetDirections[gasStep % jetDirections.length] === ">" && check(rock, chamber, "right")) {
                rock = rock.map((dot)=>[dot[0], dot[1]+1]);
            }
            gasStep += 1;

            // fall
            if(check(rock, chamber, "down")) {
                rock = rock.map((dot)=>[dot[0]-1, dot[1]]);
            } else {
                isRockFallen = true;
            }

        }
        chamber.push(...rock);
        count += 1;
    }
    print(chamber);
    return getHeighest(chamber);
};

const getHeighest = (chamber) => chamber.map((dot)=>dot[0]).sort((a,b)=>b-a)[0]+1 || 0;

const check = (rock, chamber, direction) => {
    let newRock = [];
    // the lowest height is minus
    switch (direction) {
        case "down":
            newRock = rock.map((dot)=>[dot[0]-1, dot[1]]);
            break;
        case "left":
            newRock = rock.map((dot)=>[dot[0], dot[1]-1]);
            break;
        case "right":
            newRock = rock.map((dot)=>[dot[0], dot[1]+1]);
            break;
        default:
            break;
    }
    const isBottom = newRock.map((dot)=>dot[0]).sort((a,b)=> a-b)[0] < 0;
    const isMostLeft = newRock.map((dot)=>dot[1]).sort((a,b)=> a-b)[0] < 0;
    const isMostRight = newRock.map((dot)=>dot[1]).sort((a,b)=> b-a)[0] > 6;
    const isOverlapped = newRock.some((dot)=>find(dot, chamber));
    return !isBottom && !isMostLeft && !isMostRight && !isOverlapped
};

const find = (dot, chamber) => chamber.find((chamberDot)=>chamberDot[0] === dot[0] && chamberDot[1] === dot[1])

const print = (chamber) => {
    const maxHeight = getHeighest(chamber);
    for (let i = maxHeight-1; i >= 0; i--) {
        let row = "|";
        for (let j = 0; j < 7; j++) {
            if (find([i, j], chamber)) {
                row += "X";
            } else {
                row += ".";
            }
        }
        row += "|";
        console.log(row);
        row = "";
    }
    console.log("+-------+");
}

const fs = require("fs");
const file = fs.readFileSync("./day17/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(task1(input));
