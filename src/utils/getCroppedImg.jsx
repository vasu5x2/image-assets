export const getCroppedImg = async (imageSrc, croppedAreaPixels, rotation = 0, flipH = false, flipV = false) => {
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.crossOrigin = "anonymous"; // Handle CORS issues
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
    });

  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const { width, height, x, y } = croppedAreaPixels;

  // Set canvas dimensions to the cropped area
  canvas.width = width;
  canvas.height = height;

  // Apply transformations (rotation, flip)
  ctx.translate(width / 2, height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
  ctx.translate(-width / 2, -height / 2);

  // Draw cropped image
  ctx.drawImage(
    image,
    x,
    y,
    width,
    height,
    0,
    0,
    width,
    height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(URL.createObjectURL(blob));
    });
  });
};

export default getCroppedImg;
