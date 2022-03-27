import createImageFromCanvas from "../helper/createImageFromCanvas";
import saveImageDataToCanvas from "../helper/saveImageDataToCanvas";

export default function createGetParticipantCells(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  return (row: ImageData) => {
    const { width, height } = row;
    saveImageDataToCanvas(canvas, ctx, row);
    const times = ctx.getImageData(0, 0, width / 9, height);
    canvas.width = width / 9;
    canvas.height = height;
    ctx.putImageData(times, 0, 0);
    const image = createImageFromCanvas(times, canvas);
    return image;
  };
}
