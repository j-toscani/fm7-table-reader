export default function saveImageDataToCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  data: ImageData
) {
  const { width, height } = data;
  canvas.width = width;
  canvas.height = height;
  ctx.putImageData(data, 0, 0);
}
