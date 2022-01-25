export type ColorRepeatEntry = {
  start: number;
  count: number;
  data: Uint8ClampedArray;
};

export default function countColorRepeats(data: Uint8ClampedArray) {
  let broken = 0;
  let maxBroken = 5;

  const highest = { count: 0, index: 0 };

  let current = {
    start: 0,
    count: 0,
    data: data.slice(0, 4),
  };
  const entries = [current];

  for (let index = 0; index * 4 < data.length; index++) {
    broken = current.data.some((entry, i) => data[index * 4 + i] !== entry)
      ? broken + 1
      : 0;

    if (broken < maxBroken) {
      current.count++;
      continue;
    }

    if (highest.count < current.count) {
      highest.count = current.count;
      highest.index = entries.length;
    }

    entries.push(current);
    current = {
      start: index - broken + 1,
      count: 1,
      data: data.slice(index * 4, index * 4 + 4),
    };
    broken = 0;
  }

  return { entries, highest: entries[highest.index] };
}
