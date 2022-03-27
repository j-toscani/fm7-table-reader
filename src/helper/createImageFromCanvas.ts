export default function createImageFromCanvas(
  data: ImageData,
  canvas: HTMLCanvasElement
) {
  const image = new Image();
  image.width = data.width;
  image.height = data.height;
  image.src = canvas.toDataURL();
  return image;
}
