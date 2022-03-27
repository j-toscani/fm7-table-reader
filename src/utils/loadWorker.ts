import { createWorker, PSM, OEM } from "tesseract.js";

export default async function loadWorker() {
  const worker = createWorker({
    logger: (m) => console.log(m),
  });
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng", OEM.LSTM_ONLY);
  await worker.setParameters({
    tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
  });
  return worker;
}
