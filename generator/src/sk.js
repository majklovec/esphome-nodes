import cleanMatrix from "./utils/cleanMatrix";

const matrix = cleanMatrix(`
JESÚOSEMJEDNAPÄŤ
ŠTYRIŠESŤSEDEMsn
JEDENÁSŤDEVÄŤDVE
DESAŤDVANÁSŤTRIo
plkHODÍNHODINAiu
HODINYArDESAŤPÄŤ
ŠTYRIDSAŤDVADSAŤ
ŤRIDSAŤPÄŤDESIAT
DEVÄŤŠTRNÁSTŠESŤ
JEDENÁSŤDVANÁSŤm
TRINÁSŤŠESTNÁSŤz
jPÄTNÁSŤOSEMNÁSŤ
pnSEDEMNÁSŤJEDNA
DEVÄTNÁSŤŠTYRIhy
DVEDESAŤDEVÄŤxng
PÄŤMINÚTYMINÚTA!`);

const SIMPLES = (pre = "") =>
  ["JEDNA", "DVA", "TRI", "ŠTYRI", "PÄŤ", "ŠESŤ", "SEDEM", "OSEM", "DEVÄŤ"].map(
    (i) => pre + i
  );
const numbers = [
  "JEDNA",
  "DVE",
  "TRI",
  "ŠTYRI",
  "PÄŤ",
  "ŠESŤ",
  "SEDEM",
  "OSEM",
  "DEVÄŤ",
  "DESAŤ",
  "JEDENÁSŤ",
  "DVANÁSŤ",
  "TRINÁSŤ",
  "ŠTRNÁST",
  "PÄTNÁSŤ",
  "ŠESTNÁSŤ",
  "SEDEMNÁSŤ",
  "OSEMNÁSŤ",
  "DEVÄTNÁSŤ",
  "DVADSAŤ",
  ...SIMPLES("DVADSAŤ "),
  "ŤRIDSAŤ",
  ...SIMPLES("ŤRIDSAŤ "),
  "ŠTYRIDSAŤ",
  ...SIMPLES("ŠTYRIDSAŤ "),
  "PÄŤDESIAT",
  ...SIMPLES("PÄŤDESIAT "),
];

function getPlural(val, jedna, dva, pet) {
  if (val === 0) return jedna;
  if (val === 1) return jedna;
  if (val < 5) return dva;
  return pet;
}

function getSentence(h, m) {
  const hod = +h % 12;
  const hh = hod === 0 ? 12 : hod;
  const hodin = getPlural(hh, "HODINA", "HODINY", "HODÍN");
  const minut = getPlural(+m, "MINÚTA", "MINÚTY", "MINÚT");
  const je = getPlural(hh, "JE", "SÚ", "JE");
  const sentence =
    `${je} ${numbers[hh - 1]} ${hodin}` +
    (+m > 0 ? ` A ${numbers[+m - 1]} ${minut}` : "");

  return sentence;
}

export { getSentence, matrix, numbers };
