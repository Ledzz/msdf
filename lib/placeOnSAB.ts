export function placeOnSAB(
  data: Float32Array,
  iw: number,
  ih: number,
  sab: SharedArrayBuffer,
  totalWidth: number,
  totalHeight: number,
  offsetX: number,
  offsetY: number,
) {
  for (let y = 0; y < totalHeight; y++) {
    const dy = y + offsetY;
    if (dy < 0 || dy >= ih) {
      continue;
    }

    for (let x = 0; x < totalWidth; x++) {
      const dx = x + offsetX;
      if (dx < 0 || dx >= iw) {
        continue;
      }

      const srcIdx = (dy * iw + dx) * 4;
      const destIdx = (y * totalWidth + x) * 4;

      sab[destIdx] = data[srcIdx] * 255;
      sab[destIdx + 1] = data[srcIdx + 1] * 255;
      sab[destIdx + 2] = data[srcIdx + 2] * 255;
      sab[destIdx + 3] = 255;
    }
  }
}
