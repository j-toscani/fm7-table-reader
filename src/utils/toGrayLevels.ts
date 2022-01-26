export default function toGrayLevels(imageData: ImageData) {
  const { data } = imageData;

  for (let index = 0; index < data.length; index += 4) {
    let avg = (data[index] + data[index + 1] + data[index + 2]) / 3;

    data[index] = avg;
    data[index + 1] = avg;
    data[index + 2] = avg;
    data[index + 3] = 255;
  }
  return imageData;
}
