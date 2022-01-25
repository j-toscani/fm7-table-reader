export type CutOptions = {
  x: number;
  y: number;
  w?: number;
  h?: number;
};

export default function cutImage(imageData: ImageData, options: CutOptions) {
  const { width, height, data } = imageData;
  const { x, y, h = data.length / 4, w = height } = options;
  const lineCuts = [] as number[];

  for (let index = y; index < h; index++) {
    const start = index * width * 4 + x * 4;
    const end = start + w * 4;
    const line = data.slice(start, end);
    lineCuts.push(...line);
  }

  return new ImageData(Uint8ClampedArray.from(lineCuts), w);
}

export function getThird(imageData: ImageData, quarter: 1 | 2 | 3 = 1) {
  const topQuarterEnd = Math.round(imageData.height / 3) * imageData.width * 4;
  return new ImageData(
    imageData.data.slice(
      topQuarterEnd * (quarter - 1),
      topQuarterEnd * quarter
    ),
    imageData.width
  );
}
