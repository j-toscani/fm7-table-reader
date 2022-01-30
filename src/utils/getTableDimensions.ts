import getTableStartY from "./getTableStartY";
import toGrayLevels from "./toGrayLevels";

export default function getTableDimensions(imageData: ImageData) {
  const transformed = toGrayLevels(imageData);

  const top = getTableStartY(transformed);
  const left = findTableLeftEnd(transformed, top);
  const ends = findTableRows(imageData, top, left);

  return { top, left, ends };
}

function findTableLeftEnd(imageData: ImageData, tableTop: number) {
  const { width, data } = imageData;

  // TODO: find first black row instead of assuming it
  const line = data.slice(
    (tableTop + 1) * width * 4,
    (tableTop + 2) * width * 4
  );
  const center = Math.floor(line.length / 2);

  let left = 0;
  for (let index = center; index > 0; index -= 4) {
    const color = line[index];
    if (color > 125) {
      left = index / 4;
      break;
    }
  }

  return left;
}

function findTableRows(imageData: ImageData, top: number, left: number) {
  const { data, width, height } = imageData;
  let rowEnds: number[] = [];
  let count = 0;

  for (let index = top; index < height; index++) {
    if (count >= 4) {
      rowEnds = rowEnds.slice(0, -3);
      break;
    }

    const pixelIndex = left * 4 + index * width * 4;
    const pixelColor = data[pixelIndex];

    if (pixelColor < 125) {
      rowEnds.push(index);
      count++;
    } else {
      count = 0;
    }
  }

  return rowEnds;
}
