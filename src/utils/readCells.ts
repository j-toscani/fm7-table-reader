import type Tesseract from "tesseract.js";

type TableEntry = {
  name: string;
  car: string;
  lapTime: string;
  raceTime: string;
};

export default async function readCells(
  worker: Tesseract.Worker,
  participants: HTMLImageElement[],
  times: HTMLImageElement[]
) {
  const tableData: TableEntry[] = [];

  for (let index = 0; index < times.length; index++) {
    const time = (await worker.recognize(times[index])).data.text;
    const participant = (await worker.recognize(participants[index])).data.text;
    const [name, car] = participant.split("\n");
    const [lapTime, raceTime] = time
      .split(" ")
      .filter((entry) => entry.match(/[0-9,:]/))
      .map((entry) => entry.trim());

    tableData.push({ name, car, lapTime, raceTime });
  }

  return tableData;
}
