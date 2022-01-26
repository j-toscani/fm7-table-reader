export default function setUpCanvas(
  onLoad: (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    image: HTMLImageElement
  ) => void
) {
  const canvas = document.querySelector("canvas")!;
  const ctx = canvas.getContext("2d")!;
  const image = document.querySelector("img")!;

  image.addEventListener("load", () => onLoad(ctx, canvas, image));

  image.src = "/images/table_11.png";
}
