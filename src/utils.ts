export function saveImageDataAsPNG(
  imageData: ImageData,
  fileName: string = "image.png",
): void {
  // Create a canvas element
  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;

  // Get the 2D rendering context
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Unable to get 2D context");
  }

  // Put the image data onto the canvas
  ctx.putImageData(imageData, 0, 0);

  // Convert the canvas to a data URL
  const dataURL = canvas.toDataURL("image/png");

  // Create a link element
  const link = document.createElement("a");
  link.download = fileName;
  link.href = dataURL;

  // Append the link to the body (required for Firefox)
  document.body.appendChild(link);

  // Programmatically click the link to trigger the download
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
}

export function saveAsJSON(data: any, fileName: string = "data.json"): void {
  // Convert the data to a JSON string
  const jsonString = JSON.stringify(data, null, 2);

  // Create a Blob with the JSON data
  const blob = new Blob([jsonString], { type: "application/json" });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;

  // Append the link to the body (required for Firefox)
  document.body.appendChild(link);

  // Programmatically click the link to trigger the download
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);

  // Revoke the URL to free up memory
  URL.revokeObjectURL(url);
}

export function imageDataToBase64PNG(imageData: ImageData): string {
  // Create a canvas element
  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;

  // Get the 2D rendering context
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Unable to get 2D context");
  }

  // Put the image data onto the canvas
  ctx.putImageData(imageData, 0, 0);

  // Convert the canvas to a data URL (base64 PNG)
  const dataURL = canvas.toDataURL("image/png");

  // Remove the "data:image/png;base64," prefix
  const base64String = dataURL.split(",")[1];

  return base64String;
}

function generateRainbowImage(width: number, height: number): ImageData {
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d")!;

  for (let y = 0; y < height; y++) {
    const hue = (y / height) * 360;
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, `hsl(${hue}, 100%, 50%)`);
    gradient.addColorStop(1, `hsl(${hue}, 100%, 100%)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, y, width, 1);
  }

  return ctx.getImageData(0, 0, width, height);
}
