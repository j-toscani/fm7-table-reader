import "./style.css";
import getCellImages from "./utils/getCellImages";

import getRowImageData from "./utils/getRowImageData";
import getTableDimensions from "./utils/getTableDimensions";
import loadWorker from "./utils/loadWorker";
import setUpCanvas from "./utils/setUpCanvas";

setUpCanvas().then(async ({ ctx, canvas }) => {
  const workerPromise = loadWorker();
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const dimensions = getTableDimensions(imageData);
  const rows = getRowImageData(ctx, dimensions);

  const { times, participants } = getCellImages(rows);
  const worker = await workerPromise;

  for (const img of times) {
    const { data } = await worker.recognize(img);
    console.log(data.text);
  }
  for (const img of participants) {
    const { data } = await worker.recognize(img);
    console.log(data.text.split("\n").join(" "));
  }
});
