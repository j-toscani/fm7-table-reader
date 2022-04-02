import "./style.css";
import handleDownloadClick from "./event_handler/handleDownloadClick";
import handleUpload from "./event_handler/handleUpload";

const button = document.querySelector("button")!;
const fileInput = document.querySelector<HTMLInputElement>("input[type=file]")!;

button.addEventListener("click", handleDownloadClick);
fileInput.addEventListener("change", handleUpload);
