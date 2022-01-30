import getPixelStart from "../helper/getPixelStart";

export default function findTableRowsEnd(
  imageData: ImageData,
  rows: number[]
): number {
  const lasts: number[] = [];

  for (let index = 0; index < rows.length; index++) {
    const rowStart = rows[index];
    const start = getPixelStart(imageData, { x: 0, y: rowStart });
    const end = start + imageData.width * 4;

    const row = imageData.data.slice(start, end);
    const map = new Map<
      number,
      { count: number; end: number; start: number }
    >();

    for (let index = 0; index < row.length; index += 4) {
      const color = row[index];

      if (!map.get(color)) {
        map.set(color, { count: 0, end: index / 4, start: index / 4 });
      }
      const value = map.get(color);

      value!.count++;
      value!.end = index;
    }

    const sorted = [...map.entries()]
      .sort((a, b) => b[1].count - a[1].count)
      .map(([_key, value]) => value);
    lasts.push(sorted[0].end / 4);
  }

  return Math.max(...lasts);
}
