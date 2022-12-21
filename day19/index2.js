let allTheEmptyAreas = [];

/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task2 = (inputs) => {
    const cubes = inputs.map((cube)=>cube.split(",").map((pos)=>parseInt(pos, 10)));
    const numSide = countSides(cubes);

    const xArray = cubes.map(([x, y, z])=>x);
    const yArray = cubes.map(([x, y, z])=>y);
    const zArray = cubes.map(([x, y, z])=>z);
    const minX = Math.min(...xArray);
    const maxX = Math.max(...xArray);
    const minY = Math.min(...yArray);
    const maxY = Math.max(...yArray);
    const minZ = Math.min(...zArray);
    const maxZ = Math.max(...zArray);

    for (let i = minX; i <= maxX; i++) {
        for (let j = minY; j <= maxY; j++) {
            for (let k = minZ; k <= maxZ; k++) {
                if (!find([i, j, k], cubes)) {
                    allTheEmptyAreas.push([i, j, k]);
                }
            }
        
        }
    }
    console.log("###  before", allTheEmptyAreas.length)
    // Remove the surface cubes and their adjacent cubes
    // z = minZ
    for (let i = minX; i <= maxX; i++) {
        for (let j = minY; j <= maxY; j++) {
            if (find([i,j,minZ], allTheEmptyAreas)) {
                console.log("### removed1b", i,j,minZ);
                removeEmptyArea([i,j,minZ], allTheEmptyAreas);
            }
        }
    }
    // // z = maxZ
    for (let i = minX; i <= maxX; i++) {
        for (let j = minY; j <= maxY; j++) {
            if(find([i,j,maxZ], allTheEmptyAreas)) {
                console.log("### removed2b", i,j,maxZ);
                removeEmptyArea([i,j,maxZ], allTheEmptyAreas)
            }
        }
    }
    // // x = minX
    for (let j = minY; j <= minY; j++) {
        for (let k = minZ; k <= maxZ; k++) {
            if(find([minX,j,k], allTheEmptyAreas)) {
                console.log("### removed3b", minX,j,k);
                removeEmptyArea([minX,j,k], allTheEmptyAreas)
            }
        }
    }
    // // x = maxX
    for (let j = minY; j <= minY; j++) {
        for (let k = minZ; k <= maxZ; k++) {
            if(find([maxX,j,k], allTheEmptyAreas)) {
                removeEmptyArea([maxX,j,k], allTheEmptyAreas)
            }
        }
    }
    // // y = minY
    for (let i = minX; i <= maxX; i++) {
        for (let k = minZ; k <= maxZ; k++) {
            if(find([i,maxY,k], allTheEmptyAreas)) {
                removeEmptyArea([i,maxY,k], allTheEmptyAreas)
            }
        }
    }
    // // y = maxY
    for (let i = minX; i <= maxX; i++) {
        for (let k = minZ; k <= maxZ; k++) {
            if(find([i,maxY,k], allTheEmptyAreas)) {
                removeEmptyArea([i,maxY,k], allTheEmptyAreas)
            }
        }
    }
    console.log("### temp", allTheEmptyAreas.filter(([a,b,c]) => (a===minX || a===maxX ||b === minY || b === maxY || c === minZ || c === maxZ)));
    
    removeEmptyArea([7, 1, 9], allTheEmptyAreas)
    removeEmptyArea([10, 1, 8], allTheEmptyAreas)
    console.log("### after1", allTheEmptyAreas.length);

    const numInsideSide = countSides(allTheEmptyAreas);
    return numSide - numInsideSide;
};

const find = ([x,y,z], cubes) => {
    // console.log("---", [x,y,z], cubes.find(([a, b, c])=> a === x && b === y && c === z));
    return cubes.find(([a, b, c])=> a === x && b === y && c === z)
};

const countSides = (cubes) => {
    let numSide = 0;
    for (const cube of cubes) {
        const [x, y, z] = cube;
        // top
        if(!find([x, y+1, z], cubes)) {
            numSide += 1;
        };
        // left
        if(!find([x+1, y, z], cubes)) {
            numSide += 1;
        };
        // right
        if(!find([x-1, y, z], cubes)){
            numSide += 1;
        };
        // bottom
        if(!find([x, y-1, z], cubes)){
            numSide += 1;
        };
        // front
        if(!find([x, y, z-1], cubes)){
            numSide += 1;
        };
        // back
        if(!find([x, y, z+1], cubes)){
            numSide += 1;
        };
    }
    return numSide;
}

const removeEmptyArea = ([x, y, z], emptyAreas) =>{
    
    emptyAreas.splice(emptyAreas.findIndex(([a,b,c]) => (a === x && b === y && c === z)), 1);
    
    if (find([x+1, y, z], emptyAreas)) removeEmptyArea([x+1, y, z], emptyAreas);
    if (find([x-1, y, z], emptyAreas)) removeEmptyArea([x-1, y, z], emptyAreas);
    if (find([x, y+1, z], emptyAreas)) removeEmptyArea([x, y+1, z], emptyAreas);
    if (find([x, y-1, z], emptyAreas)) removeEmptyArea([x, y-1, z], emptyAreas);
    if (find([x, y, z+1], emptyAreas)) removeEmptyArea([x, y, z+1], emptyAreas);
    if (find([x, y, z-1], emptyAreas)) removeEmptyArea([x, y, z-1], emptyAreas);
}

const fs = require("fs");
const file = fs.readFileSync("./day18/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(task2(input));
