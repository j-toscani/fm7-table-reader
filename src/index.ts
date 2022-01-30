import "./style.css";
import getTableDimensions from "./utils/getTableDimensions";
import setUpCanvas from "./utils/setUpCanvas";

setUpCanvas((ctx, canvas, image) => {
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, image.width, image.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const dimensions = getTableDimensions(imageData);

  ctx.putImageData(imageData, 0, 0);
  printTableRows(canvas, dimensions);
});

function printTableRows(
  src: HTMLCanvasElement,
  dimensions: {
    top: number;
    left: number;
    rows: number[];
    end: number;
  }
) {
  const { left, end, rows, top } = dimensions;

  const main = document.querySelector("main");

  for (let index = 0; index < rows.length; index++) {
    const start = index ? rows[index - 1] : top;
    const bottom = rows[index];

    if (bottom - start < 10) {
      // Too small for table row
      continue;
    }

    const { canvas, ctx } = createCanvasAndCtx({
      width: end,
      height: bottom - start,
    });

    drawSubImage(src, ctx!, {
      x: left,
      y: start,
      width: end,
      height: bottom - start,
    });

    main?.append(canvas!);
  }
}

function createCanvasAndCtx(options: { width: number; height: number }) {
  const { width, height } = options;
  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");

  return {
    canvas,
    ctx,
  };
}

function drawSubImage(
  from: HTMLCanvasElement,
  to: CanvasRenderingContext2D,
  dimensions: { x: number; y: number; width: number; height: number }
) {
  const { x, y, width, height } = dimensions;
  to.drawImage(from, x, y, width, height, 0, 0, width, height);
}
