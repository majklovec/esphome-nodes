import { getRandomChar } from "./getRandomChar";

function XY(x, y) {
  return 16 * y + x;
}

function checkPoint(matrix, x, y) {
  const diffs = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];
  const current = matrix[y][x];
  // console.log("current", current);
  for (let i = 0; i < diffs.length; i++) {
    const [diffX, diffY] = diffs[i];
    if (diffX + x < 0 || diffX + x > 15) continue;
    if (diffY + y < 0 || diffY + y > 15) continue;
    if (current === matrix[y + diffY][x + diffX]) {
      return true;
    }
  }

  return false;
}

function checkMatrix(matrix) {
  for (let x = 0; x < 16; x++) {
    for (let y = 0; y < 16; y++) {
      if (checkPoint(matrix, x, y)) {
        return { x, y };
      }
    }
  }

  return false;
}

function cleanMatrix(matrix) {
  return matrix
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.padEnd(16, ".").replace(/\./g, getRandomChar).toUpperCase());
}
export default cleanMatrix;
