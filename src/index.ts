import "./style.css";
import getTableDimensions from "./utils/getTableDimensions";
import setUpCanvas from "./utils/setUpCanvas";

setUpCanvas((ctx, canvas, image) => {
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, image.width, image.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { top, left, ends } = getTableDimensions(imageData);

  ctx.putImageData(imageData, 0, 0);
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 5;
  ctx.strokeRect(
    left,
    top,
    imageData.width - left,
    ends[ends.length - 1] - top + 2
  );

  ends.forEach((end) => {
    ctx.fillStyle = "red";
    ctx.fillRect(0, end, image.width, 1);
  });
});
