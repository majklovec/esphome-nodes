const chars = "BDFGHIJKLMNOPQRSUVXY";
let oold;
export const getRandomChar = (_, __, offset, str) => {
  const old = str?.[offset - 1] || oold;
  const future = str?.[offset + 1] || oold;
  let char;
  do {
    char = chars[Math.floor(Math.random() * 20)];
  } while (char === old || char === future);
  oold = char;
  return char;
};
