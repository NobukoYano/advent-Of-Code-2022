const fs = require('fs');
const NUM_ROCKS = 10000000;

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
const task2 = (inputs) => {
    const jetDirections = inputs[0].split("");
    let count = 0; // number of rocks to be fallen
    let gasStep = 0; // the step of the jet of fas
    let chamber = [];
    const heightDelta = [];
    let pre = 0;
    console.log("##### count", count, new Date().toISOString());
    while (count < NUM_ROCKS) {
        // fall a rock
        // initial position of the rock
        let rock = rocks[count % 5].map((dot)=>[dot[0]+3+getHeighest(chamber), dot[1]]);
        let isRockFallen = false;

        while (!isRockFallen) {
            // push
            if (jetDirections[gasStep % jetDirections.length] === "<") {
                rock = check(rock, chamber, "left");
            }
            if (jetDirections[gasStep % jetDirections.length] === ">") {
                rock = check(rock, chamber, "right");
            }
            gasStep += 1;

            // fall
            let preRock = rock;
            rock = check(rock, chamber, "down");

            // The rock was not moved
            if(preRock.every(([a,b])=>rock.find(([x,y])=>a === x && b === y))) {
                isRockFallen = true;
            }
        }
        chamber.push(...rock);
        count += 1;

        if (count % (jetDirections.length * 5) === 0) {
            console.log("##### count", count, new Date().toISOString(), getHeighest(chamber) - pre);
            heightDelta.push(getHeighest(chamber) - pre);
            pre = getHeighest(chamber);
        }

        // remove items if whole the horizontal line is blocked
        chamber = cleanUp(chamber);
    }

    writeFile(JSON.stringify(heightDelta, null, 4), "delta.txt");
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
    return !isBottom && !isMostLeft && !isMostRight && !isOverlapped ? newRock : rock;
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
        if (row === "|.......|") {
            break;
        }
        row = "";
    }
    console.log("+-------+");
}

const writeFile = (data, filename) => {
    fs.writeFile(filename, data, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
        }
    });
}

const cleanUp = (chamber) => {
    const sortedChamber = chamber.sort((a, b) => b[0] - a[0]);
    const cleanedChamber = [sortedChamber[0]];
    let row = sortedChamber[0][0];
    let rowCount = 1;
    for (let i = 1; i < sortedChamber.length; i++) {
        if (row === sortedChamber[i][0]) {
            rowCount += 1;
        } else {
            rowCount = 1;
            row = sortedChamber[i][0];
        }
        cleanedChamber.push(sortedChamber[i])
        if (rowCount >= 7) {
            break;
        }
    }
    return cleanedChamber;
}

const file = fs.readFileSync("./day17/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(task2(input));


// let init = 7;
// let count = 0;
// let height = init;
// const add = [59, 59, 59, 64, 60, 61, 62];
// const sum = add.reduce((acc, curr)=> acc+curr, 0);
// while (count <= 1000) { // 1000000000000
//     height = height + sum;
//     count += 40 * 7;
//     console.log("### count, height", count, height);
// }

// console.log("##### height count", height, count);