import binarizeImageData from "../utils/binarizeImage";
import createGetParticipantCells from "./createGetParticipantCells";
import createGetTimesCells from "./createGetTimesCells";

export default function getCellImages(rows: ImageData[]) {
  rows.forEach(binarizeImageData);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  const getParticipantCells = createGetParticipantCells(canvas, ctx);
  const getTimesCells = createGetTimesCells(canvas, ctx);

  const times = rows.map(getTimesCells);
  const participants = rows.map(getParticipantCells);

  return { times, participants };
}
