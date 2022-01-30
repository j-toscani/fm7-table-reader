import getPixelStart from "../helper/getPixelStart";

export default function findTableRows(
  imageData: ImageData,
  top: number,
  left: number
) {
  const { data, height } = imageData;
  let rowEnds: number[] = [];
  let count = 0;

  for (let index = top; index < height; index++) {
    if (count >= 4) {
      rowEnds = rowEnds.slice(0, -3);
      break;
    }

    const pixelIndex = getPixelStart(imageData, { x: left, y: index });
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
