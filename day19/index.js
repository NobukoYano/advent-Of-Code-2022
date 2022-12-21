const NUM_MINUTES = 12;
const totalGeode = {}
/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task1 = (input) => {
    const blueprints = format(input);
    Object.keys(blueprints).forEach((plueprintKey)=>totalGeode[plueprintKey] = 0);
    const robots = {
        ore: 1,
        clay: 0,
        obsidian: 0,
        geode: 0
    }
    const resources = {
        ore: 0,
        clay: 0,
        obsidian: 0,
        geode: 0
    }
    for (const [key, value] of Object.entries(blueprints)) {
        // find max geode
        produce(resources, robots, value, 1, key);
        
    }
    return totalGeode;
};
/**
 * @typedefv {Object} ProductionCost
 * @property {number} cost
 * @property {"ore"|"clay"|"obsidian"|"geode"} unit
 */
/**
 * 
 * @param {{ore: number, clay: number, obsidian: number, geode: number}} resources 
 * @param {{ore: number, clay: number, obsidian: number, geode: number}} robots
 * @param {{ore: Array<ProductionCost>, clay: Array<ProductionCost>, obsidian: Array<ProductionCost>, geode: Array<ProductionCost>}} blueprint 
 * @param {number} minutes 
 * @param {string} blueprintKey 
 */
const produce = (resources, robots, blueprint, minutes, blueprintKey) => {
    console.log("### minutes", minutes);
    console.log("### resources", resources);
    console.log("### robots", robots);
    if (minutes > NUM_MINUTES) {
        return totalGeode[blueprintKey] = Math.max(totalGeode[blueprintKey], resources.geode);
    }
    
    // factory a robot if possible
    for (const key of ["geode", "obsidian", "ore", "clay"]) {
        const productionCost = blueprint[key];
        if (checkFactory(resources, productionCost)) {

            const newResources = {...resources};
            const newMinutes = minutes + 1;
            const newRobots = {...robots};

            // factory a robot;
            newRobots[key] += 1;
            // reduce resources
            productionCost.forEach((el)=> newResources[el.unit] -= el.cost);             
            // collect resources
            Object.entries(robots).forEach(([robotKey, numRobots])=>{
                newResources[robotKey] += numRobots;
            })
             produce(newResources, newRobots, blueprint, newMinutes, blueprintKey);
        }
    };
    
    // Not factory a robot
    const newResources2 = {...resources};
    const newMinutes2 = minutes + 1;
    const newRobots2 = {...robots};
    Object.entries(robots).forEach(([robotKey, numRobots])=>{
        newResources2[robotKey] += numRobots;
    })
    produce(newResources2, newRobots2, blueprint, newMinutes2, blueprintKey);
    
}

const checkFactory = (resources, productionCost) => productionCost.every(({cost, unit})=>resources[unit] >= cost);

const format = (data) => {
    const blueprints = {};
    for (const row of data) {
        const items = row.split(" ");
        const key = items[1].replace(":", "");
        blueprints[key] = {};
        blueprints[key]["ore"] = [{cost: parseInt(items[6], 10), unit: items[7].replace(".", "")}];
        blueprints[key]["clay"] = [{cost: parseInt(items[12], 10), unit: items[13].replace(".", "")}];
        blueprints[key]["obsidian"] = [
            {cost: parseInt(items[18], 10), unit: items[19]},
            {cost: parseInt(items[21], 10), unit: items[22].replace(".", "")}
        ];
        blueprints[key]["geode"] = [
            {cost: parseInt(items[27], 10), unit: items[28]},
            {cost: parseInt(items[30], 10), unit: items[31].replace(".", "")}
        ];
    }
    return blueprints;
}

const fs = require("fs");
const file = fs.readFileSync("./day19/sample.txt").toString('utf-8');
const input = file.split("\n")

console.log(JSON.stringify(task1(input), null, 4));
