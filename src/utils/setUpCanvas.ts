export type LoadedPayload = {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  image: HTMLImageElement;
};

export default function setUpCanvas(src: string) {
  const canvas = document.createElement("canvas")!;
  const ctx = canvas.getContext("2d")!;
  const dspImage =
    document.querySelector<HTMLImageElement>("img[data-display]")!;
  const image = document.querySelector<HTMLImageElement>("img[data-canvas]")!;

  const promise = new Promise<LoadedPayload>((resolve, _reject) => {
    image.addEventListener("load", () => {
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0, image.width, image.height);
      resolve({ ctx, canvas, image });
    });

    dspImage.src = src;
    image.src = src;
  });

  return promise;
}
