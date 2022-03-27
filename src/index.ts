import "./style.css";
import getCellImages from "./utils/getCellImages";

import getRowImageData from "./utils/getRowImageData";
import getTableDimensions from "./utils/getTableDimensions";
import loadWorker from "./utils/loadWorker";
import readCells from "./utils/readCells";
import setUpCanvas from "./utils/setUpCanvas";

setUpCanvas().then(async ({ ctx, canvas }) => {
  const workerPromise = loadWorker();
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const dimensions = getTableDimensions(imageData);
  const rows = getRowImageData(ctx, dimensions);

  const { times, participants } = getCellImages(rows);
  const worker = await workerPromise;
  const tableData = await readCells(worker, participants, times);
  console.log(tableData);
});
