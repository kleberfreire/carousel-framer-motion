import type { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";
import path from "path";
import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig();

const SIZES = {
  small: 200,
  medium: 400,
  large: 800
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const rotation = parseFloat((req.query.rotation as string) ?? "0");
  const cropInfo = {
    left: parseFloat((req.query.x as string) ?? "0"),
    top: parseFloat((req.query.y as string) ?? "0"),
    width: parseFloat((req.query.width as string) ?? "100"),
    height: parseFloat((req.query.height as string) ?? "100")
  };
  const size = req.query.croppedImageSize ?? "small";

  const dogPath = path.join(
    serverRuntimeConfig.PROJECT_ROOT,
    `./public/dog-${SIZES[size as string]}.jpeg`
  );

  const dogImage = sharp(dogPath);

  await dogImage.metadata().then((metadata) => {
    console.log(`Source image size is ${metadata.width}x${metadata.height}`);
  });

  console.log(`Rotating... ${rotation} degrees`);
  await dogImage.rotate(rotation);

  const meta = await sharp(await dogImage.toBuffer()).metadata();

  console.log(`Rotated image size is ${meta.width}x${meta.height}`);

  console.log(`Cropping...`, cropInfo);

  cropInfo.top = Math.round((cropInfo.top / 100) * meta.height);
  cropInfo.left = Math.round((cropInfo.left / 100) * meta.width);
  cropInfo.width = Math.round((cropInfo.width / 100) * meta.width);
  cropInfo.height = Math.round((cropInfo.height / 100) * meta.height);

  console.log("Extracting...", cropInfo);

  const imgBuffer = await dogImage.extract(cropInfo).jpeg().toBuffer();

  return res.status(200).send(imgBuffer);
};

export default handler;