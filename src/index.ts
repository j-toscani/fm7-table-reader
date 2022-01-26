import "./style.css";
import getTableDimensions from "./utils/getTableDimensions";
import setUpCanvas from "./utils/setUpCanvas";

setUpCanvas((ctx, canvas, image) => {
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, image.width, image.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { top, left } = getTableDimensions(imageData);

  ctx.putImageData(imageData, 0, 0);
  ctx.strokeStyle = "blue";
  ctx.strokeRect(500, top + 1, imageData.width / 2, 10);
});
