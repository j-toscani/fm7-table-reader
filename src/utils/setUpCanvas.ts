type LoadedPayload = {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  image: HTMLImageElement;
};

export default function setUpCanvas() {
  const canvas = document.createElement("canvas")!;
  const ctx = canvas.getContext("2d")!;
  const image = document.querySelector("img")!;

  const promise = new Promise<LoadedPayload>((resolve, _reject) => {
    image.addEventListener("load", () => {
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0, image.width, image.height);
      resolve({ ctx, canvas, image });
    });
    image.src = "/images/new.png";
  });

  return promise;
}
