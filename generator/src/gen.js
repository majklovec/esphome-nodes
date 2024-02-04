const { getSentence, matrix } = require("./cs");

function getRanges(all, inputs) {
  // const all = matrix.join("");
  let found = -1;
  let res = [];
  if (!inputs) return [];
  inputs.forEach((val, i) => {
    const f = all.indexOf(val, found);
    if (f !== -1) {
      found = f + val.length + 1;
      res.push({ start: f, length: val.length });
    }
  });

  return res;
}

const res = [];
let row = 0;

for (let h = 12; h >= 1; h--) {
  for (let m = 59; m >= 0; m--) {
    const words = getSentence(h, m).split(" ");
    words.forEach((word, i) => {
      const ranges = getRanges(res.join(""), words.slice(0, i));
      console.log(words.slice(0, i).join(" "), ranges.length, i);
      if (ranges.length < i) {
        if (!res[row]) {
          res[row] = "";
        }
        if ((res[row] + word).length < 16) {
          res[row] += word;
        } else {
          row++;
          res[row] = word;
        }
      }
    });
  }
}
console.log(res);
