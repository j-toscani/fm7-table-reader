import "./style.css";
import cutImage, { CutOptions } from "./utils/cutImage";
import getTableTop from "./utils/getTableTop";
import toGrayLevels from "./utils/toGrayLevels";

const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;

const image = document.querySelector("img")!;

image.addEventListener("load", () => {
  canvas.width = image.width;
  canvas.height = image.height;

  let imageData = resetImage();
  const head = getTableTop(imageData);
  imageData = resetImage();
  const hits = getTableRows(imageData, {
    x: head.startX,
    y: head.startY,
    w: head.end,
  });

  ctx.strokeStyle = "red";
  hits.forEach((hit, index) => {
    ctx.strokeRect(
      head.startX,
      head.startY + (hits[index - 1] ?? 0),
      head.end,
      hit - (hits[index - 1] ?? 0)
    );
  });
});

function resetImage() {
  ctx.drawImage(image, 0, 0, image.width, image.height);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function getTableRows(imageData: ImageData, cut: CutOptions) {
  const newCut = cutImage(imageData, cut);
  const transformed = toGrayLevels(newCut, 8);
  const { width, height, data } = transformed;

  const hits = [] as number[];
  let consecutives = 0;
  for (let index = 0; index < height; index++) {
    const color = data[index * width * 4 + (width * 4) / 2];

    if (color === 32) {
      !(index % 10) ? hits.push(index) : null;
      consecutives = hits.includes(index - 1) ? consecutives + 1 : 0;
    } else if (color !== 192 && color !== 0) {
      console.log(index, color);
      break;
    }
  }
  return Array.from(hits) as number[];
}

image.src = "/images/result_4.jpg";
