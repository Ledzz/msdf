export function placeOnImageData(
  data: Float32Array,
  iw: number,
  ih: number,
  imageData: ImageData,
  offsetX: number,
  offsetY: number,
) {
  for (let y = 0; y < imageData.height; y++) {
    const dy = y + offsetY;
    if (dy < 0 || dy >= ih) {
      continue;
    }

    for (let x = 0; x < imageData.width; x++) {
      const dx = x + offsetX;
      if (dx < 0 || dx >= iw) {
        continue;
      }

      const srcIdx = (dy * iw + dx) * 3;
      const destIdx = (y * imageData.width + x) * 4;

      imageData.data[destIdx] = data[srcIdx] * 255;
      imageData.data[destIdx + 1] = data[srcIdx + 1] * 255;
      imageData.data[destIdx + 2] = data[srcIdx + 2] * 255;
      imageData.data[destIdx + 3] = 255;
    }
  }
}
