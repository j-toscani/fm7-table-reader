import findTableLeftEnd from "./findTableLeftEnd";
import findTableRows from "./findTableRows";
import getTableStartY from "./getTableStartY";
import toGrayLevels from "./toGrayLevels";

export default function getTableDimensions(imageData: ImageData) {
  const transformed = toGrayLevels(imageData);

  const top = getTableStartY(transformed);
  const left = findTableLeftEnd(transformed, top);
  const rows = findTableRows(imageData, top, left);

  return { top, left, rows };
}
