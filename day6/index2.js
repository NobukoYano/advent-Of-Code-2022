/**
 * day X - first
 * @param {string} file
 * @param {number} count
 * @return {number}
 */
const calculate = (file, count) => {
    const start = new Date();

    const arr = file.split(",").map((el)=>parseInt(el));
    const result = [arr];

    // console.log(`initial:`, arr);
    for (let i = 0; i < count; i++) {
        let add = 0;
        for (const [index1, _] of result.entries()) {
            for (const [index2, num] of result[index1].entries()) {
                result[index1][index2] = num - 1;
                if (num === 0) {
                    add += 1;
                    result[index1][index2] = 6;
                } else {
                    result[index1][index2] = num - 1;
                }
            }
        }

        const currentLength = result.length;
        if (add) {
            result[currentLength] = [];
            if (i === 208) {
                console.log("#### debug", add);
            }
            let chunk = 0;
            for (let j = 0; j < add; j++) {
                if (chunk !== Math.floor((j + result[currentLength + chunk].length) / (2 ** 30))) {
                    console.log("### chunked", j);
                    chunk += 1;
                    result[currentLength + chunk] = [];
                }
                result[currentLength + chunk].push(8);
            }
        }
        console.log(`#### ${i} days/ ${add} laternefish added`);
    }
    const end = new Date();
    console.log("#### Performance:  " + (end - start) / 1000 + " seconds.");
    return result.reduce((acc, current)=> acc + current.length, 0);
};

const fs = require("fs");
const file = fs.readFileSync("./day6/sample.txt").toString('utf-8');

// start with `node --max-old-space-size=8192 day6/index2.js`
console.log(calculate(file, 256));
