const NUM_ROCKS = 2022;
/**
 * day X - first
 * @param {Array<string>} inputs
 * @return {number}
 */
const task1 = (file) => {
    const heightDelta = JSON.parse(file);
    return isRepeating(heightDelta.join("")); // no repeat found
};

const isRepeating = (str = '') => {
    if (!str.length){
        return false
    };
   for(let length = 1; (length <= str.length / 2); length++){
        for (let start = 0; start < (str.length / 2 - length); start++) {
            const repeatingString = str.substring(start, start+length);
            let flag = true;
            let pos = start;
            while (flag) {
                if (repeatingString === str.substring(pos, pos+length)) {
                    pos += length;
                } else {
                    flag = false
                }
            }

            if(flag){
                return {start, length};
            }
            console.log("#### start, length", start, length, repeatingString);
        }
   }
   return {start: -1, length: -1};
};

const fs = require("fs");
const file = fs.readFileSync("./day17/sampleHeightDelta.txt").toString('utf-8');

console.log(task1(file));
