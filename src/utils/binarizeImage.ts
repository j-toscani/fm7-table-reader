export default function binarizeImageData(row: ImageData) {
  const { data } = row;

  thresholdFilter(data);

  return row;
}

function thresholdFilter(pixels: ImageData["data"], level: number = 0.25) {
  const thresh = Math.floor(level * 255);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    let val;
    if (gray >= thresh) {
      val = 0;
    } else {
      val = 255;
    }
    pixels[i] = pixels[i + 1] = pixels[i + 2] = val;
  }
}
