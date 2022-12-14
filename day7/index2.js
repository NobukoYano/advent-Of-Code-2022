const total = 70000000;
const limit = 30000000;
/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task2 = (inputs) => {
    const directories = analyzeDirectories(inputs);
    const currentFreeSpace = total - directories["/"];
    return Object.values(directories).filter((value)=> value >= (limit - currentFreeSpace)).sort((a, b) => a - b)[0];
};

const analyzeDirectories = (inputs) => {
    // example
    // const directory = {
    //     a: {
    //         e: {
    //             i: 584
    //         },
    //         f: 29116,
    //         g: 2557,
    //         h: 62596
    //     },
    //     b: 14848514,
    //     c: 8504156,
    //     d: {
    //         j: 4060174,
    //         "d.log": 8033020,
    //         "d.ext": 5626152,
    //         k: 7214296
    //     }
    // }
    // const directoriesExample = {
    //     "/": 48381165,
    //     "/-a": 94853, // includes a-e
    //     "/-a-e": 584,
    //     "/-d": 24933642
    // }
    const directories = {"/": 0};
    let currentDir = [];
    for (const input of inputs) {
        // command
        if (input[0] === "$") {
            const [_, command, dirName] = input.split(" ");
            // ls, cd
            if (command === "cd" && dirName !== "..") {
                currentDir.push(dirName);
            }
            if (command === "cd" && dirName === "..") {
                currentDir.pop();
            }
        } else {
            const [firstCol, name] = input.split(" ");
            if (firstCol === "dir") {
                const path = currentDir.join("-") + "-" + name;
                directories[path] = 0;
            } else {
                const tempPath = [...currentDir];
                while (tempPath.length) {
                    directories[tempPath.join("-")] += parseInt(firstCol, 10);
                    tempPath.pop();
                }
                
            }   
        }
    }
    return directories;
};


const fs = require("fs");
const file = fs.readFileSync("./day7/input.txt").toString('utf-8');
const input = file.split("\n")

console.log(task2(input));
