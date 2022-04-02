import { LoadedPayload } from "./setUpCanvas";

import createTableRow from "../components/createTableRow";
import getCellImages from "./getCellImages";

import getRowImageData from "./getRowImageData";
import getTableDimensions from "./getTableDimensions";
import loadWorker from "./loadWorker";
import readCells from "./readCells";

export async function readImageData(paylaod: LoadedPayload) {
  const { canvas, ctx } = paylaod;

  const workerPromise = loadWorker();
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const dimensions = getTableDimensions(imageData);
  const rows = getRowImageData(ctx, dimensions);

  const { times, participants } = getCellImages(rows);
  const worker = await workerPromise;
  const tableData = await readCells(worker, participants, times);
  const rowElements = tableData.map(createTableRow);

  document.querySelector("table")?.classList.toggle("hide");
  rowElements.forEach((row) => document.querySelector("tbody")?.append(row));
}
