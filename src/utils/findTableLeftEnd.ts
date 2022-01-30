export default function findTableLeftEnd(
  imageData: ImageData,
  tableTop: number
) {
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
