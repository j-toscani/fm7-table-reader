import findTableLeftEnd from "./findTableLeftEnd";
// import findTableRowsEnd from "./findTableRowEnd";
import findTableRows from "./findTableRows";
import findTableStartY from "./findTableStartY";
import toGrayLevels from "./toGrayLevels";

export default function getTableDimensions(imageData: ImageData) {
  const transformed = toGrayLevels(imageData);

  const top = findTableStartY(transformed);
  const left = findTableLeftEnd(transformed, top);
  const rows = findTableRows(imageData, top, left);

  const end = imageData.width - left * 2;

  return { top, left, rows, end };
}
