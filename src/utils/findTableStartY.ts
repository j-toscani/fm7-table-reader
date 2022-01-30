import getPixelRows from "./getPixelRows";

export default function getTableStartY(imageData: ImageData) {
  const endOfFirstThird = Math.round(imageData.height / 3);

  const rows = getPixelRows(imageData).slice(0, endOfFirstThird);
  return findTableTop(rows);
}

function findTableTop(rows: Uint8ClampedArray[]) {
  const center = Math.round(rows[0].length / 2);
  let top = rows.length;

  for (let index = rows.length - 1; index > 0; index--) {
    const color = rows[index][center];
    if (color > 125) {
      top = index;
      break;
    }
  }

  return top;
}
