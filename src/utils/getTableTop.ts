import { getThird } from "./cutImage";
import imageDataToLines from "./imageDataToLines";
import toGrayLevels from "./toGrayLevels";

export default function getTableTop(imageData: ImageData) {
  const topThird = getThird(imageData);
  const transformed = toGrayLevels(topThird, 2);
  const lines = imageDataToLines(transformed);

  let x = 0;
  let y = 0;

  for (let index = lines.length - 1; index > 0; index--) {
    const line = lines[index];
    const center = line[line.length / 2];

    if (center !== 128) {
      continue;
    }

    x = line.findIndex((entry) => entry === 128);
    y = index;

    break;
  }

  return {
    startX: Math.floor(x / 4),
    end: imageData.width - Math.floor(x / 4) * 2,
    startY: y,
  };
}
