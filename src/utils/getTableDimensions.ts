import getPixelRows from "./getPixelRows";
import getTableStartY from "./getTableStartY";
import toGrayLevels from "./toGrayLevels";

export default function getTableDimensions(imageData: ImageData) {
  const transformed = toGrayLevels(imageData);

  const top = getTableStartY(transformed);
  const rowEnds = getRowEnds(transformed, top);

  return { top, rowEnds };
}

function getRowEnds(imageData: ImageData, top: number) {
  const rows = getPixelRows(imageData);
  const center = Math.round(rows[0].length / 2);

  const colors = new Set();
  const rowYs = [];

  for (let index = top; index < rows.length; index++) {
    const color = rows[index][center];
    colors.add(color);

    if (color < 40 && color > 30) {
      rowYs.push(index);
      break;
    }
  }

  console.log(colors, rowYs, top);
}
