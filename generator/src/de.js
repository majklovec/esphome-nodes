import cleanMatrix from "./utils/cleanMatrix";

const matrix = cleanMatrix(`
ES123J0WARAIST
WIRDBF1CGERADE
GENAUM2DGLEICH
FÜNF5A3VIERTEL
ZEHN6M4ZWANZIG
NACH7JVOREHALB
EINS8JZWEIDREI
VIER9AFGHIFÜNF
SECHSSJKSIEBEN
ACHTLONEUNZEHN
ELFMNNOPQZWÖLF
UHRUVDWVORNACH
MORGENSMITTAGS
NACHTSXYABENDS`);

const SIMPLES = (pre = "") =>
  ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE"].map(
    (i) => pre + i
  );

const numbers = [
  "ONE",
  "TWO",
  "THREE",
  "FOUR",
  "FIVE",
  "SIX",
  "SEVEN",
  "EIGHT",
  "NINE",
  "TEN",
  "ELEVEN",
  "TWELVE",
  "THIRTEEN",
  "FOURTEEN",
  "FIVETEEN",
  "SIXTEEN",
  "SEVENTEEN",
  "EIGHTEEN",
  "NINETEEN",
  "TWENTY",
  ...SIMPLES("TWENTY "),
  "THIRTY",
  ...SIMPLES("THIRTY "),
  "FOURTY",
  ...SIMPLES("FOURTY "),
  "FIFTY",
  ...SIMPLES("FIFTY "),
];

function getPlural(val, jedna, dva, pet) {
  if (val - 1 > 0) return dva;
  return jedna;
}

function getSentence(h, m) {
  if (h === 0 && m === 0) {
    return "IT IS MIDNIGHT";
  }
  if (h === 12 && m === 0) {
    return "IT IS NOON";
  }
  const hod = +h % 12;
  const hh = hod === 0 ? 12 : hod;

  let minutes = "";
  if (m < 30) {
    minutes = `${numbers[+m - 1]} PAST`;
  } else {
    minutes = `${numbers[60 - +m - 1]} TO`;
  }
  if (m === 15) {
    minutes = "QUARTER PAST";
  }
  if (m === 30) {
    minutes = "HALF PAST";
  }
  if (m === 45) {
    minutes = "QUARTER TO";
  }
  if (m === 0) return `IT IS ${numbers[hh - 1]} O'CLOCK`;
  const sentence = `IT IS ${minutes} ${numbers[hh - 1]} `;

  return sentence;
}

export { getSentence, matrix, numbers };
