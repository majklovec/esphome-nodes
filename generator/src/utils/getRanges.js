function getRanges(matrix, inputs) {
  const all = matrix.join("");
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
export { getRanges };
