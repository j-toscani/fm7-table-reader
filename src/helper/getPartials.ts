export default function getPartials(rows: ImageData[]) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  const rowTimes = rows.map((row) => {
    const { width, height } = row;
    saveToCanvas(canvas, ctx, row);
    const times = ctx.getImageData(8 * (width / 11) + 5, 0, width, height);

    ctx.putImageData(times, 0, 0);
    const image = createImage(times, canvas);
    return image;
  });

  const rowParticipants = rows.map((row) => {
    const { width, height } = row;
    saveToCanvas(canvas, ctx, row);
    const times = ctx.getImageData(0, 0, width / 9, height);
    canvas.width = width / 9;
    canvas.height = height;
    ctx.putImageData(times, 0, 0);
    const image = createImage(times, canvas);
    return image;
  });

  return [...rowTimes, ...rowParticipants];
}

function createImage(data: ImageData, canvas: HTMLCanvasElement) {
  const image = new Image();
  image.width = data.width;
  image.height = data.height;
  image.src = canvas.toDataURL();
  return image;
}

function saveToCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  data: ImageData
) {
  const { width, height } = data;
  canvas.width = width;
  canvas.height = height;
  ctx.putImageData(data, 0, 0);
}
