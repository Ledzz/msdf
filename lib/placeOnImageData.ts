export function placeOnImageData(
  data: Float32Array,
  iw: number,
  ih: number,
  output: Uint8ClampedArray,
  width: number,
  height: number,
  offsetX: number,
  offsetY: number,
) {
  for (let y = 0; y < height; y++) {
    const dy = y + offsetY;
    if (dy < 0 || dy >= ih) {
      continue;
    }

    for (let x = 0; x < width; x++) {
      const dx = x + offsetX;
      if (dx < 0 || dx >= iw) {
        continue;
      }

      const srcIdx = (dy * iw + dx) * 3;
      const destIdx = (y * width + x) * 4;

      output[destIdx] = data[srcIdx] * 255;
      output[destIdx + 1] = data[srcIdx + 1] * 255;
      output[destIdx + 2] = data[srcIdx + 2] * 255;
      output[destIdx + 3] = 255;
    }
  }
}
