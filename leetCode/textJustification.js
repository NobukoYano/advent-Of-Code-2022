const input = require("./textJustification.input");

/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function(words, maxWidth) {
    const result = [];
    let line = "";
    for (let i = 0; i < words.length; i++) {
        // check if word can be added
        if (line.length === 0) {
            line = words[i];
        } else {
            if ((line.length + words[i].length + 1) <= maxWidth) {
                line += " " + words[i];
            } else {
                result.push(fullyJustifySpaces(line, maxWidth));
                line = words[i];
            }
        }
    }
    if (line.length) {
        result.push(line += Array(maxWidth-line.length).fill(" ").join(""));
    }
    return result;

};

const fullyJustifySpaces = (string, width) => {
    const wordsArray = string.split(" ");
    const totalLength = wordsArray.reduce((acc, curr)=>acc+curr.length, 0);


    const restSpaces = width - totalLength;

    // If one element, do nothing and fill the spaces until the end
    if (wordsArray.length === 1) {
        return string += Array(restSpaces).fill(" ").join("");

    }

    const addSpaces = Math.floor(restSpaces / (wordsArray.length - 1));
    const restOfAddedSpaces = restSpaces % (wordsArray.length - 1);

    for (let j = 0; j < wordsArray.length - 1; j++) {
        if (restOfAddedSpaces === 0) {
            wordsArray[j] += Array(addSpaces).fill(" ").join("");
        } else {
            if (j < restOfAddedSpaces) {
                wordsArray[j] += Array(addSpaces+1).fill(" ").join("");
            } else {
                wordsArray[j] += Array(addSpaces).fill(" ").join("");
            }
        }
    }

    return wordsArray.join("");
}

console.log(fullJustify(input.words, input.maxLength));