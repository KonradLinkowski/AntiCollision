export function getUnder(max: number) {
  return getRange(0, max)
}

export function getRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
