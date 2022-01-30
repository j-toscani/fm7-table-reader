export default function getPixelStart(
  imageData: ImageData,
  coordinates: { x: number; y: number }
): number {
  const { x, y } = coordinates;
  const line = imageData.width * 4 * y;
  const linePoint = x * 4;

  return line + linePoint;
}
