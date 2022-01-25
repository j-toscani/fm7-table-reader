export default function toGrayLevels(imageData: ImageData, shadeCount: number = 4) {
  const data = imageData.data;

  for (let index = 0; index < data.length; index += 4) {
    let avg = (data[index] + data[index + 1] + data[index + 2]) / 3;

    if(shadeCount) {
      const partial = Math.round(255 / shadeCount);
      const rest = avg % partial;
      avg = avg - rest;
    }

    data[index] = avg; // red
    data[index + 1] = avg; // green
    data[index + 2] = avg; // blue
    data[index + 3] = 255; // alpha
  }
  return imageData;
}
