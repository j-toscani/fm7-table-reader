export default function getRowImageData(
  ctx: CanvasRenderingContext2D,
  dimensions: {
    top: number;
    left: number;
    rows: number[];
    end: number;
  }
) {
  const { left, end, rows, top } = dimensions;
  const images: ImageData[] = [];

  for (let index = 0; index < rows.length; index++) {
    const start = index ? rows[index - 1] : top;
    const bottom = rows[index];

    if (bottom - start < 10) {
      // Too small for table row
      continue;
    }

    const imageData = ctx.getImageData(left, start, end, bottom - start);
    images.push(imageData);
  }

  return images;
}

export function printRowImages(rows: ImageData[]) {
  const main = document.querySelector("main");
  rows.forEach((row) => {
    const cv = document.createElement("canvas")!;
    const ctx2 = cv.getContext("2d")!;

    cv.width = row.width;
    cv.height = row.height;

    ctx2.putImageData(row, 0, 0);
    main?.append(cv);
  });
}
