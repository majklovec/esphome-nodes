import cleanMatrix from "./utils/cleanMatrix";

const matrix = cleanMatrix(`
JEJSOUZAuvyMÍNUS
ČTYŘImJEDENJEDNA
DVĚPĚTŘIŠESTSEDM
OSMJEDENÁCTDEVĚT
DESETDVANÁCTNULA
jHODINAHODINYzAr
PADESÁTČTYŘICETy
DVACETŘICEThbDVĚ
ČTYŘIDEVĚTJEDNAb
zTŘINÁCTČTRNÁCTd
PATNÁCTrŠESTNÁCT
JEDENÁCTDVANÁCTo
hSEDMNÁCTOSMNÁCT
DEVATENÁCTDESETh
PĚTMINUTAMINUTY%
!POLEDNEPŮLNOC°C`);

const SIMPLES = (pre = "") =>
  ["JEDNA", "DVA", "TŘI", "ČTYŘI", "PĚT", "ŠEST", "SEDM", "OSM", "DEVĚT"].map(
    (i) => pre + i
  );

const numbers = [
  "JEDNA",
  "DVĚ",
  "TŘI",
  "ČTYŘI",
  "PĚT",
  "ŠEST",
  "SEDM",
  "OSM",
  "DEVĚT",
  "DESET",
  "JEDENÁCT",
  "DVANÁCT",
  "TŘINÁCT",
  "ČTRNÁCT",
  "PATNÁCT",
  "ŠESTNÁCT",
  "SEDMNÁCT",
  "OSMNÁCT",
  "DEVATENÁCT",
  "DVACET",
  ...SIMPLES("DVACET "),
  "TŘICET",
  ...SIMPLES("TŘICET "),
  "ČTYŘICET",
  ...SIMPLES("ČTYŘICET "),
  "PADESÁT",
  ...SIMPLES("PADESÁT "),
];

function getPlural(val, jedna, dva, pet) {
  if (val === 0) return jedna;
  if (val === 1) return jedna;
  if (val < 5) return dva;
  return pet;
}

function getSentence(h, m) {
  if (h === 0 && m === 0) {
    return "JE PŮLNOC";
  }
  if (h === 12 && m === 0) {
    return "JE POLEDNE";
  }
  const hod = +h % 12;
  const hh = hod === 0 ? 12 : hod;
  const hodin = getPlural(hh, "HODINA", "HODINY", "HODIN");
  const minut = getPlural(+m, "MINUTA", "MINUTY", "MINUT");
  const je = getPlural(hh, "JE", "JSOU", "JE");
  const sentence =
    `${je} ${numbers[hh - 1]} ${hodin}` +
    (+m > 0 ? ` A ${numbers[+m - 1]} ${minut}` : "");

  return sentence;
}

export { getSentence, matrix, numbers };
