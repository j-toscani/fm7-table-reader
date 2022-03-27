import createImageFromCanvas from "../helper/createImageFromCanvas";
import saveImageDataToCanvas from "../helper/saveImageDataToCanvas";

export default function createGetTimesCells(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  return (row: ImageData) => {
    const { width, height } = row;
    saveImageDataToCanvas(canvas, ctx, row);
    const participant = ctx.getImageData(
      8 * (width / 11) + 5,
      0,
      width,
      height
    );

    ctx.putImageData(participant, 0, 0);
    const image = createImageFromCanvas(participant, canvas);
    return image;
  };
}
