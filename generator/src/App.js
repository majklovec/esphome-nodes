import {
  documentToSVG,
  elementToSVG,
  inlineResources,
  formatXML,
} from "dom-to-svg";
import { useEffect, useState } from "react";
import useInterval from "./utils/useInterval";
import { Matrix } from "./Matrix";
import { getRanges } from "./utils/getRanges";
import "./App.css";

function generateAnimatedGIFFromBitmaps(bitmaps) {
  const gif = new window.GIF({
    workers: 4,
    quality: 10,
  });

  const delayBetweenFrames = 100; // Delay between frames in milliseconds

  bitmaps.forEach((bitmap) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const width = 16;
    const height = 16;

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Clear canvas for new frame
    ctx.clearRect(0, 0, width, height);

    // Draw bitmap on canvas
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        ctx.fillStyle = bitmap[y][x] === 1 ? "black" : "white";
        ctx.fillRect(x, y, 1, 1);
      }
    }

    // Add current frame to the GIF
    gif.addFrame(canvas, { delay: delayBetweenFrames });
  });

  // Finish GIF creation
  gif.render();
  gif.on("progress", function (p) {
    console.log("progress", p);
  });
  gif.on("finished", function (blob) {
    window.open(URL.createObjectURL(blob));
  });
}

// Generate animated GIF from bitmaps

function download_file(name, contents, mime_type) {
  mime_type = mime_type || "application/octet-stream";

  var blob = new Blob([contents], { type: mime_type });

  var dlink = document.createElement("a");
  dlink.download = name;
  dlink.href = window.URL.createObjectURL(blob);
  dlink.onclick = function (e) {
    // revokeObjectURL needs a delay to work properly
    var that = this;
    setTimeout(function () {
      window.URL.revokeObjectURL(that.href);
    }, 1500);
  };

  dlink.click();
  dlink.remove();
}

function inRange(index, ranges) {
  // console.log("inRange", index, ranges);
  return ranges.find(
    (range) => range.start <= index && index < range.length + range.start
  );
}

const App = () => {
  const [res, setRes] = useState([]);
  const [mins, setMins] = useState("");
  const [lng, setLng] = useState("en");
  const [fns, setFns] = useState();
  const [bitmaps, setBitmaps] = useState([]);
  useEffect(() => {
    async function init() {
      const lang = await import(`./${lng}.js`);
      setFns(lang);
    }
    init();
  }, [lng]);

  // useInterval(() => {
  //   setMins((mins) => (mins > 59 ? 0 : mins + 1));
  // }, 1000);
  useEffect(() => {
    const r = [];

    if (fns) {
      const b = [];
      for (let i = 0; i < 24 * 60; i++) {
        const h = Math.floor(i / 60);
        const sentence = fns.getSentence(h, i % 60);
        const ranges = getRanges(fns.matrix, sentence.split(" "));

        const test = ranges
          .map((r) => {
            return fns.matrix.join("").substring(r.start, r.start + r.length);
          })
          .join(" ");
        if (test !== sentence) console.log(`${h}:${i % 60} = ${sentence}`);
        const bitmap = [];
        // console.log(ranges);
        r[i] = fns.matrix.map((h, j) => {
          const row = h
            .split("")
            .map((c, i) => (inRange(i + 16 * j, ranges) ? "1" : "0"));
          bitmap[j] = row.map((c) => +c);
          return +parseInt(row.join(""), 2);
        });
        b.push(bitmap);
        // console.log(sentence, bitmap);
      }
      console.log(ranges, b);

      setRes(new Uint16Array(r.flat()));

      setBitmaps(b);
    }
  }, [fns]);
  if (!fns) return null;

  function screenshot(inv = false) {
    document.querySelector("#matrix").style.background = inv
      ? "black"
      : "white";
    document.querySelector("#matrix").style.color = inv ? "white" : "black";

    const svgDocument = elementToSVG(document.querySelector("#matrix"));

    document.querySelector("#matrix").style.background = "white";
    document.querySelector("#matrix").style.color = "black";

    const svgString = new XMLSerializer().serializeToString(svgDocument);

    download_file(lng + (inv ? "-inverse" : "") + ".svg", svgString);
  }

  const onClick = () => {
    generateAnimatedGIFFromBitmaps(bitmaps);
    // download_file(lng + ".bin", res);
  };
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const sentence = fns.getSentence(h, m);
  const ranges = getRanges(fns.matrix, sentence.split(" "));
  return (
    <>
      <div>
        <input
          value={mins}
          type="number"
          onChange={(e) => setMins(e.target.value)}
        />
        {["cs", "sk", "es", "en", "ua", "fr", "de"].map((l) => (
          <button onClick={() => setLng(l)}>{l}</button>
        ))}
        <button onClick={() => screenshot(false)}>download SVG</button>
        <button onClick={() => screenshot(true)}>download inverse SVG</button>
        <br />
        {h}:{m} {sentence}
        <br />
        <a href="#" onClick={onClick}>
          download gif
        </a>
      </div>
      <Matrix data={fns.matrix} ranges={mins === "" ? [] : ranges} />
    </>
  );
};

export default App;
