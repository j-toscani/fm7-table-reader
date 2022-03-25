import getPartials from "./helper/getPartials";
import "./style.css";
import { createWorker, PSM, OEM } from "tesseract.js";

import getRowImageData from "./utils/getRowImageData";
import getTableDimensions from "./utils/getTableDimensions";
import setUpCanvas from "./utils/setUpCanvas";

setUpCanvas(async (ctx, canvas, image) => {
  const workerPromise = loadWorker();
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, image.width, image.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const dimensions = getTableDimensions(imageData);

  ctx.putImageData(imageData, 0, 0);
  const rows = getRowImageData(ctx, dimensions);
  rows.forEach(binarizeImageData);
  const rowPartials = getPartials(rows);

  const worker = await workerPromise;

  for (const img of rowPartials) {
    const text = await recognise(worker, img);
    console.log(text);
  }
});

async function recognise(worker: Tesseract.Worker, img: HTMLImageElement) {
  const {
    data: { text },
  } = await worker.recognize(img);
  return text;
}

function binarizeImageData(row: ImageData) {
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

async function loadWorker() {
  const worker = createWorker({
    logger: (m) => console.log(m),
  });
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng", OEM.LSTM_ONLY);
  await worker.setParameters({
    tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
  });
  return worker;
}
