export default function getPixelRows(imageData: ImageData) {
  const lines = [];
  const to = imageData.width * 4;

  for (let index = 0; index * to < imageData.data.length; index++) {
    const start = index * to;
    lines.push(imageData.data.slice(start, start + to));
  }

  return lines;
}
