const lineLength = 16;
const size = 35.43307 * (160 / 168.205) * (160 / 160.9) * (160 / 160.139);

const chars = "BCDEFGHIJKLMNOPQRSUVWXY";
let oold;
const getRandomChar = (_, __, offset, str) => {
  const old = str?.[offset - 1] || oold;
  let char;
  do {
    char = chars[Math.floor(Math.random() * 20)];
  } while (char === old);
  oold = char;
  return char;
};

function inRange(index, ranges) {
  return ranges.find(
    (range) =>
      range.start <= index &&
      index < range.start + range.length &&
      range.start !== -1
  );
}

function flipIndex(x, y) {
  return y % 2 ? y * lineLength + x : y * lineLength + (15 - x);
}

const Row = ({ line, index, ranges, nums }) => {
  // console.log({ ranges });
  return line.split("").map((c, i) => {
    const ii = index * lineLength + i;
    const iii = flipIndex(i, index);
    const isOn = inRange(ii, ranges);

    const color = isOn ? "red" : "";
    return (
      <td key={i}>
        <div
          style={{
            width: size + "px",
            height: size + "px",
            lineHeight: size + "px",
            color,
          }}
        >
          {c === "." ? " " : c}
          {nums && <sup>{ii}</sup>}
        </div>
      </td>
    );
  });
};

export const Matrix = ({ data, ranges, nums }) => (
  <table
    id="matrix"
    style={{ border: "1px solid black", backgroundColor: "white" }}
  >
    <tbody>
      {data.map((h, i) => {
        return (
          <tr key={i} className={nums ? "nums" : ""}>
            <Row index={i} line={h} nums={nums} ranges={ranges}></Row>
          </tr>
        );
      })}
    </tbody>
  </table>
);
