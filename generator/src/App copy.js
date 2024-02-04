import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";
import { getRandomChar } from "./utils/getRandomChar";
let exportr = {};
function exportRanges(ranges) {
  console.log(
    "{" +
      ranges
        .map((range) => {
          return `{ ${range.start}, ${range.end} }`;
        })
        .join(",") +
      "}"
  );
}

const digits = {
  0: `.%%.
      @..%
      %..%
      %..%
      .%%.`,

  1: `..%%
      .%.%
      ...%
      ...%
      ...%`,

  2: `.%%.
      %..%
      ..%.
      .%..
      %%%%`,

  3: `%%%%
      ...%
      .#4%.
      ...%
      %%%%`,

  4: `..%.
      .%%.
      %.%.
      %%%%
      ..%.`,

  5: `%%%%
      %...
      %%%.
      ...%
      %%%.`,

  6: `.%%%
      %...
      %%%.
      %..%
      .%%..`,

  7: `%%%%
      ...%
      ..%%
      .%%.
      .%..`,

  8: `.%%
      %..%
      .%%.
      %..%
      .%%.`,

  9: `.%%.
      %..%
      .%%%
      ...%
      .%%.`,

  c: `.%%.
      %..
      %..
      .%%.`,
};
const digWidth = 5;
const offset = 16 * 5 + 1;

const matrix = `
JEJSOUZA...MÍNUS
JEDENJEDNAČTYŘI.
PĚTŘIDVĚŠESTSEDM
JEDENÁCTOSMDEVĚT
DESETDVANÁCTNULA
HODINA.HODINY.A.
ČTYŘICETPADESÁT.
DVACETŘICET..DVĚ
ČTYŘIDEVĚTJEDNA.
JEDENÁCTDVANÁCT.
TŘINÁCTČTRNÁCTA.
PATNÁCT.ŠESTNÁCT
SEDMNÁCTOSMNÁCT.
DEVATENÁCT.DESET
PĚTMINUTYMINUTA!
POLEDNE%PŮLNOC°C`

  .replace(/\./g, getRandomChar)
  .split("\n");
const lineLength = matrix[1].length;
const all = matrix.join("");

const size = 60;
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

function setFont(font) {
  document.body.style.fontFamily = font;
}
function inRange(index, ranges) {
  return ranges.find(
    (range) => range.start <= index && index < range.end && range.start !== -1
  );
}

const Row = ({ line, index, ranges }) => {
  // console.log({ ranges });
  return line.split("").map((c, i) => {
    const ii = (index - 1) * lineLength + i;
    const iii =
      index % 2
        ? (index - 1) * lineLength + (15 - i)
        : (index - 1) * lineLength + i;

    return (
      <td
        style={{
          width: size + "px",
          height: size + "px",
          color: inRange(ii, ranges)?.color,
        }}
      >
        <div>{iii}</div>
      </td>
    );
  });
};
const colors = {
  0: "blue",
  1: "white",
  2: "yellow",
};
function getRanges(inputs) {
  let found = -1;
  let res = [];
  if (!inputs) return [];
  let color = colors[0];
  inputs.forEach((val, i) => {
    // if ("0123456789".includes(val[0])) {
    //   color = colors[+val[0]];
    //   val = val.substring(1);
    // }

    const f = all.indexOf(val, found);
    if (f !== -1) {
      found = f + val.length + 1;
      res.push({ start: f, end: f + val.length, color });
    }
  });

  return res;
}
function toMins(s) {
  const [h, m] = s.split(":");
  const res = +h * 60 + +m;
  console.log(h, m, res);
  return res;
}
function getPlural(val, jedna, dva, pet) {
  if (val === 0) return jedna;
  if (val === 1) return jedna;
  if (val < 5) return dva;
  return pet;
}
let int;
let maxPower = 0;

function getSentence(mins) {
  let sentence = "";
  if (mins !== "") {
    if (mins === "0:0") {
      sentence = "JE PŮLNOC";
    } else if (mins === "12:0") {
      sentence = "JE POLEDNE";
    } else if (mins.indexOf(":") !== -1) {
      const [h, m] = mins.split(":");

      const hodin = getPlural(+h, "HODINA", "HODINY", "HODIN");
      const minut = getPlural(+m, "MINUTA", "MINUTY", "MINUT");
      const je = getPlural(+h, "JE", "JSOU", "JE");
      sentence =
        `${je} ${numbers[+h - 1]} ${hodin}` +
        (+m > 0 ? ` A ${numbers[+m - 1]} ${minut}` : "");
    } else {
      const je = getPlural(Math.abs(mins), "JE", "JSOU", "JE");
      const minus = +mins < 0 ? "MÍNUS " : "";
      const stupneNumbers = ["JEDEN", "DVA", ...numbers.slice(2)];
      stupneNumbers[-1] = "NULA";
      sentence = `${je} ${minus}${stupneNumbers[Math.abs(mins) - 1]} °C`;

      // mins
      //   .toString()
      //   .split("")
      //   .forEach((dig, digInfex) => {
      //     const d = digits[dig]
      //       ?.trim()
      //       ?.split("\n")
      //       ?.map((j) => j.trim());
      //     console.log(mins, d);
      //     if (d) {
      //       d.forEach((row, rIndex) => {
      //         const bin = row.split("");
      //         console.log(row, bin);
      //         bin.forEach((bit, index) => {
      //           if (bit !== ".") {
      //             ranges.push({
      //               start:
      //                 +rIndex * lineLength +
      //                 +index +
      //                 digInfex * digWidth +
      //                 offset,
      //               end:
      //                 +rIndex * lineLength +
      //                 +index +
      //                 1 +
      //                 digInfex * digWidth +
      //                 offset,
      //             });
      //           }
      //         });
      //       });
      //     }
      //   });
    }
  }
  return sentence;
}

const App = () => {
  const [mins, setMins] = useState("");

  function testTemp() {
    setMins("-59");
    clearInterval(int);
    int = setInterval(
      () => setMins((mins) => "" + (+mins > 50 ? -50 : +mins + 1)),
      1000
    );
  }

  function testTime() {
    setMins("0:0");
    clearInterval(int);
    int = setInterval(
      () =>
        setMins((mins) => {
          if (mins === "0:0") return "1:0";
          if (mins === "12:59") {
            clearInterval(int);
          }
          let [h, m] = mins.split(":");
          if (+m === 59) {
            h = +h + 1;
            m = 0;
          } else {
            m = +m + 1;
          }
          return h + ":" + m;
        }),
      100
    );
  }

  const sentence = getSentence(mins);
  const ranges = getRanges(sentence?.split(" "));
  const test = ranges
    .map((r) => {
      return matrix.join("").substring(r.start, r.end);
    })
    .join(" ");
  if (test !== sentence)
    console.log(
      "!!!!!!!!!!!!!!!!!!!!!",
      test + " should be " + sentence + ", source:" + mins
    );

  const power = ranges.reduce((prev, actual) => {
    return prev + actual.end - actual.start;
  }, 0);

  if (power > maxPower) {
    maxPower = power;
  }
  const rangesx = ranges.map((range) => {
    const row = Math.floor(range.start / 16);
    if (row % 2) return range;

    function swap({ start, end }) {
      if (start > end) {
        return { end: start, start: end };
      }
      return { start, end };
    }

    function getCoords(pos) {
      return { y: Math.floor(pos / 16), x: pos % 16 };
    }

    function getPos(x, y) {
      return y * 16 + x;
    }

    function flip(pos) {
      const { x, y } = getCoords(pos);
      return getPos(16 - x, y);
    }

    return swap({
      end: flip(range.start),
      start: flip(range.end),
    });
  });

  exportr[mins.split(":")[1]] = rangesx.slice(4);
  console.log(exportr);
  // exportRanges(ranges);
  // exportRanges(rangesx);

  //  const x= [{ 0, 2 },  { 21, 26 },{ 80, 86 },{ 94, 95 },{ 112, 118 },{ 184, 188 },{ 227, 232 }];
  //   const y=[{ 15, 13 },{ 21, 26 },{ 80, 86 },{ 94, 95 },{ 112, 118 },{ 184, 188 },{ 236, 231 }];

  // else console.log(test + " should be " + sentence + ", source:" + mins);
  return (
    <>
      <input onChange={(e) => setMins(e.target.value)} value={mins || ""} />
      <button onClick={testTime}>test time</button>
      <button onClick={testTemp}>test temp</button>
      <br />
      {["Black Ops One", "Plaster", "Saira Stencil One"].map((b) => {
        return <button onClick={(e) => setFont(b)}>{b}</button>;
      })}
      <br />
      maxpower: {(maxPower * 20 * 3) / 1000}A,{" "}
      {((maxPower * 20 * 3) / 1000) * 5}W <br />
      power: {(power * 20 * 3) / 1000}A, {((power * 20 * 3) / 1000) * 5}W <br />
      {sentence}
      <table bgColor="black" style={{ border: "1px solid black" }}>
        {matrix.map((h, i) => {
          return (
            <tr>
              <Row index={i} line={h} ranges={ranges}></Row>
            </tr>
          );
        })}
      </table>
      <br />
      <table bgColor="black" style={{ border: "1px solid black" }}>
        {matrix.map((h, i) => {
          return (
            <tr>
              <Row index={i} line={h} ranges={rangesx}></Row>
            </tr>
          );
        })}
      </table>
    </>
  );
};

export default App;
