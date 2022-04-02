export default function createTableRow(object: { [key: string]: string }) {
  const tableCells = Object.entries(object).map(([key, value]) =>
    createTableCell(key, value)
  );
  const row = document.createElement("tr");

  tableCells.forEach((cell) => row.append(cell));
  return row;
}

function createTableCell(name: string, text: string) {
  const td = document.createElement("td");
  const input = document.createElement("input");
  input.type = "text";
  input.value = text;
  input.name = name;

  td.append(input);
  return td;
}
