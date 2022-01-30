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
  printTable(canvas, dimensions);
});

function printTable(
  canvas: HTMLCanvasElement,
  dimensions: { top: number; left: number; rows: number[]; end: number }
) {
  const { top, left, rows, end } = dimensions;
  const cutCanvas = document.querySelector<HTMLCanvasElement>("#cut")!;
  const cutCtx = cutCanvas.getContext("2d")!;

  cutCanvas.width = end;
  cutCanvas.height = rows[rows.length - 1] - top;

  cutCtx.drawImage(
    canvas,
    left,
    top,
    cutCanvas.width,
    cutCanvas.height,
    0,
    0,
    cutCanvas.width,
    cutCanvas.height
  );
}
