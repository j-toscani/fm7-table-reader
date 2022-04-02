export default function handleDownloadClick(_e: Event) {
  const rows = getRows();

  const headNames = readColNames();
  const data = rows.map(readRowData);
  const fileContent = createCsvFile([headNames, ...data]);

  downloadCsvFile(fileContent);
}

function downloadCsvFile(fileContent: string) {
  const downloadLink = document.createElement("a");
  downloadLink.href = "data:text/csv;charset=utf-8," + encodeURI(fileContent);
  downloadLink.target = "_blank";
  downloadLink.download = `ForzaRaceData_${Date.now().toString()}.csv`;
  downloadLink.click();
}

function createCsvFile(content: string[][]) {
  return content.map((array) => array.join(",")).join("\n");
}

function getRows() {
  return Array.from(
    document.querySelectorAll<HTMLTableRowElement>("tbody tr")!
  );
}

function readColNames() {
  const tHeads = document.querySelectorAll("th")!;
  const colNames: string[] = [];

  tHeads.forEach((th) => colNames.push(th.innerText.trim()));

  return colNames;
}

function readRowData(row: HTMLTableRowElement) {
  const inputs = row.querySelectorAll("input");
  const data: string[] = [];

  inputs.forEach(({ value }) => data.push(value.replaceAll(",", ":")));

  return data;
}
