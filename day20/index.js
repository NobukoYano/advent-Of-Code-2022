const NUM_MIXING = 3000;
/**
 * day X - first
 * @param {Array<string>} input
 * @return {number}
 */
const task1 = (input) => {
    const result =  [];
    const initialArray = input.map((el)=>parseInt(el, 10));
    let array = [...initialArray];
    const length = initialArray.length;
    // console.log("### initial", initialArray.join(", "));
    for (let i = 0; i < NUM_MIXING; i++) {
        array = mixing(array, initialArray[i % length]);
        // console.log("### changed", i, array.join(", "));
        if ((i+1)%1000 === 0) {
            const indexZero = array.indexOf(0);
            result.push(array[indexZero+1]);
        }
    }


    return result;
};

const mixing = (arr, char) => {
    const newArray = [...arr];
    if (char === 0) return newArray;
    const originalIndex = arr.indexOf(char);

    const [num] = newArray.splice(originalIndex, 1);
    let sum = num + originalIndex;
    if ((sum) < 0) {
        sum = sum + newArray.length;
    }
    const newIndex = (sum) % newArray.length;
    // console.log("### mixing", arr.join(", "), char, originalIndex, newIndex);
    if (newIndex === 0) {
        newArray.push(num);
        return newArray;
    }
    if (newIndex === newArray.length) {
        newArray.unshift(num);
        return newArray;
    }
    newArray.splice(newIndex, 0 , num)
    return newArray;
}

const fs = require("fs");
const file = fs.readFileSync("./day20/sample.txt").toString('utf-8');
const input = file.split("\n")

console.log(task1(input));
