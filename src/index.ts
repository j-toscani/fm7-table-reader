import "./style.css";
import getRowImageData, { printRowImages } from "./utils/getRowImageData";
import getTableDimensions from "./utils/getTableDimensions";
import setUpCanvas from "./utils/setUpCanvas";

setUpCanvas((ctx, canvas, image) => {
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, image.width, image.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const dimensions = getTableDimensions(imageData);

  ctx.putImageData(imageData, 0, 0);
  const rows = getRowImageData(ctx, dimensions);
  printRowImages(rows);
});
