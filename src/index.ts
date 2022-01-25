import "./style.css";
import cutImage, { CutOptions } from "./utils/cutImage";
import getTableTop from "./utils/getTableTop";
import imageDataToLines from "./utils/imageDataToLines";
import toGrayLevels from "./utils/toGrayLevels";

const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;

const image = document.querySelector("img")!;

image.addEventListener("load", () => {
  canvas.width = image.width;
  canvas.height = image.height;

  let imageData = resetImage();
  const head = getTableTop(imageData);

  const bottom = getBottom(imageData, {
    x: head.startX,
    y: head.startY,
    w: head.end,
  });

  imageData = resetImage();

  ctx.fillStyle = "blue";
  ctx.fillRect(head.startX, head.startY, head.end, bottom);
  ctx.fillStyle = "blue";
  // ctx.fillRect(head.startX, head.startY, head.count, 5);
});

function resetImage() {
  ctx.drawImage(image, 0, 0, image.width, image.height);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function getBottom(imageData: ImageData, cut: CutOptions) {
  const newCut = cutImage(imageData, cut);
  const transformed = toGrayLevels(newCut, 8);
  const { width, height, data } = transformed;

  let bottom = 0;
  for (let index = height; index > 0; index--) {
    const color = data[index * width * 4 + (width * 4) / 2];

    if (color === 32) {
      bottom = height - index;
    }
  }

  return bottom;
}
function getTableRows(imageData: ImageData, cut: CutOptions) {
  const newCut = cutImage(imageData, cut);
  const transformed = toGrayLevels(newCut, 8);
  const { width, height, data } = transformed;

  const hits = new Set();
  for (let index = 0; index < height; index++) {
    const color = data[index * width * 4 + (width * 4) / 2];

    if (color === 32 && !hits.has(index - 1) && !hits.has(index + 1)) {
      hits.add(index);
    }
  }
}

image.src = "/images/second_result.png";
