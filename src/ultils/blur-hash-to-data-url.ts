import { decode } from "blurhash";

export const blurHashToDataUrl = (blurHash: string, width = 32, height = 32) => {
  const pixels = decode(blurHash, width, height);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if(!ctx) return '';

  canvas.width = width;
  canvas.height = height;

  const imageData = ctx.createImageData(width, height);
  imageData.data.set(pixels);
  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL();
};