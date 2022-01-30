import getPixelStart from "../helper/getPixelStart";

export default function findTableLeftEnd(
  imageData: ImageData,
  tableTop: number
) {
  const { data } = imageData;
  const start = getPixelStart(imageData, { x: 0, y: tableTop + 1 });
  const end = getPixelStart(imageData, { x: 0, y: tableTop + 2 });

  // TODO: find first black row instead of assuming it
  const line = data.slice(start, end);
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
