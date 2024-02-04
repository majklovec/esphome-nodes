import cleanMatrix from "./utils/cleanMatrix";

const matrix = cleanMatrix(`
ESONbrUNAOCHOxcz
pvDOSTRESÉISIETE
nDIECIOCHOCINCOp
CUATRONUEVEDOCEr
DIEZONCEmHORASdY
UNAhpvCINCUENTAf
gdmTREINTAVEINTI
CUARENTAMEDIODÍA
bYcDIECIONCEDOCE
TRECECATORCEmpdh
nbQUINCECUATROEN
ENtOCHOVEINTEUNO
xPUNTOMEDIANOCHE
DIEZOCHOCINCOzny
bTRESÉISIETEDOSw
NUEVEdMINUTOSgt!`);

const SIMPLES = (pre = "") =>
  [
    "UN",
    "DOS",
    "TRES",
    "CUATRO",
    "CINCO",
    "SÉIS",
    "SIETE",
    "OCHO",
    "NUEVE",
  ].map((i) => pre + i);

const numbers = [
  "UN",
  "DOS",
  "TRES",
  "CUATRO",
  "CINCO",
  "SÉIS",
  "SIETE",
  "OCHO",
  "NUEVE",
  "DIEZ",
  "ONCE",
  "DOCE",
  "TRECE",
  "CATORCE",
  "QUINCE",
  "DIECI SÉIS",
  "DIECI SIETE",
  "DIECI OCHO",
  "DIECI NUEVE",
  "VEINTE",
  ...SIMPLES("VEINTI "),
  "TREINTA",
  ...SIMPLES("TREINTA Y "),
  "CUARENTA",
  ...SIMPLES("CUARENTA Y "),
  "CINCUENTA",
  ...SIMPLES("CINCUENTA Y "),
];

const SIMPLESWOMAN = (pre = "") =>
  [
    "UN",
    "DOS",
    "TRES",
    "CUATRO",
    "CINCO",
    "SÉIS",
    "SIETE",
    "OCHO",
    "NUEVE",
  ].map((i) => pre + i);

const numbersWoman = [
  "UNA",
  "DOS",
  "TRES",
  "CUATRO",
  "CINCO",
  "SÉIS",
  "SIETE",
  "OCHO",
  "NUEVE",
  "DIEZ",
  "ONCE",
  "DOCE",
  "TRECE",
  "CATORCE",
  "QUINCE",
  "DIECI SÉIS",
  "DIECI SIETE",
  "DIECI OCHO",
  "DIECI NUEVE",
  "VEINTE",
  ...SIMPLESWOMAN("VEINTI "),
  "TREINTA",
  ...SIMPLESWOMAN("TREINTA Y"),
  "CUARENTA",
  ...SIMPLESWOMAN("CUARENTA Y"),
  "CINCUENTA",
  ...SIMPLESWOMAN("CINCUENTA Y"),
];

function getPlural(val, jedna, dva, pet) {
  if (val - 1 > 0) return dva;
  return jedna;
}

function getSentence(h, m) {
  if (h === 12 && m === 0) {
    return "ES MEDIODÍA";
  }
  if (h === 0 && m === 0) {
    return "ES MEDIANOCHE";
  }
  const hod = +h % 12;
  const hh = hod === 0 ? 12 : hod;
  const hodin = getPlural(hh, "HORA", "HORAS");
  const minut = getPlural(+m, "MINUTO", "MINUTOS");
  const je = getPlural(hh, "ES", "SON");
  const sentence =
    `${je} ${numbersWoman[hh - 1]} ${hodin}` +
    (+m > 0 ? ` Y ${numbers[+m - 1]} ${minut}` : " EN PUNTO");

  return sentence;
}

export { getSentence, matrix, numbers };

/*
          "en punto",
          "uno",
          "dos",
          "tres",
          "cuatro",
          "cinco",
          "seis",
          "siete",
          "ocho",
          "nueve",
          "diez",
          "once",
          "doce",
          "trece",
          "catorce",
          "y cuarto",
          "dieciséis",
          "diecisiete",
          "dieciocho",
          "diecinueve",
          "veinte",
          "veintiuno",
          "veintidós",
          "veintitrés",
          "veinticuatro",
          "veinticinco",
          "veintiséis",
          "veintisiete",
          "veintiocho",
          "veintinueve",
          "y media",
          "treinta y uno",
          "treinta y dos",
          "treinta y tres",
          "treinta y cuatro",
          "treinta y cinco",
          "treinta y seis",
          "treinta y siete",
          "treinta y ocho",
          "treinta y nueve",
          "cuarenta",
          "cuarenta y uno",
          "cuarenta y dos",
          "cuarenta y tres",
          "cuarenta y cuatro",
          "cuarenta y cinco",
          "cuarenta y seis",
          "cuarenta y siete",
          "cuarenta y ocho",
          "cuarenta y nueve",
          "cincuenta",
          "cincuenta y uno",
          "cincuenta y dos",
          "cincuenta y tres",
          "cincuenta y cuatro",
          "cincuenta y cinco",
          "cincuenta y seis",
          "cincuenta y siete",
          "cincuenta y ocho",
          "cincuenta y nueve"
*/
