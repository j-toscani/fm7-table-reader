import { readImageData } from "../utils/readImageData";
import setUpCanvas from "../utils/setUpCanvas";

const inputWrapper = document.querySelector<HTMLInputElement>("#input")!;
const loadingIndicator = document.querySelector<HTMLDivElement>("#loading")!;

export default function handleUpload(e: Event) {
  const file = (e.target as HTMLInputElement).files![0];
  const reader = new FileReader();

  reader.onload = (event) => {
    setUpCanvas(event.target!.result as string)
      .then(readImageData)
      .then(() => {
        loadingIndicator.classList.toggle("hide");
      });
    inputWrapper.classList.toggle("hide");
    loadingIndicator.classList.toggle("hide");
  };

  reader.readAsDataURL(file);
}
