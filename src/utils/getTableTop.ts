import { getThird } from "./cutImage";
import imageDataToLines from "./imageDataToLines";
import toGrayLevels from "./toGrayLevels";

export default function getTableTop(imageData: ImageData) {
  const topThird = getThird(imageData);
  const transformed = toGrayLevels(topThird, 2);
  const lines = imageDataToLines(transformed);

  const found = { startY: 0, startX: 0, end: 0 };

  for (let index = lines.length - 1; index > 0; index--) {
    const line = lines[index];
    const center = line[line.length / 2];

    if (center !== 128) {
      continue;
    }

    const { start, count } = findFirstLongest(line);

    found.startX = Math.floor(start / 4);
    (found.startY = index), (found.end = count / 4);

    break;
  }

  return found;
}

function findFirstLongest(line: Uint8ClampedArray, color: number = 128) {
  const start = line.findIndex((entry) => entry === color);
  let count = 0;

  for (let innerIndex = start; innerIndex < line.length; innerIndex += 4) {
    if (line[innerIndex] === color) {
      continue;
    }

    count = innerIndex - start;
    break;
  }

  return {
    start,
    count,
  };
}
