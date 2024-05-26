// utils/resizeAndCropImage.ts
export const resizeAndCropImage = (file: File, maxSize: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const size = Math.min(img.width, img.height);
      const startX = (img.width - size) / 2;
      const startY = (img.height - size) / 2;

      canvas.width = maxSize;
      canvas.height = maxSize;

      if (ctx) {
        ctx.drawImage(img, startX, startY, size, size, 0, 0, maxSize, maxSize);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve(url);
            } else {
              reject(new Error('Canvas is empty'));
            }
          },
          'image/jpeg',
          1
        );
      } else {
        reject(new Error('Failed to get canvas context'));
      }
    };

    img.onerror = (err) => {
      reject(err);
    };
  });
};
