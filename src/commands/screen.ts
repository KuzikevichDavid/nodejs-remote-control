import { mouse, Region, screen } from '@nut-tree/nut-js';
import Jimp, { MIME_PNG } from 'jimp';

export const getScreen = async (): Promise<string> => {
  const position = await mouse.getPosition();
  const scrW = await screen.width();
  const scrH = await screen.height();
  const width = 200;
  const height = width;
  const calcLeft = position.x - Math.round(width / 2);
  const calcTop = position.y - Math.round(width / 2);
  let left = 0, top = 0;
  if (calcLeft < 0) {
    left = 0
  } else if (calcLeft + width > scrW) {
    left = scrW - width;
  } else {
    left = calcLeft;
  }
  if (calcTop < 0) {
    top = 0
  } else if (calcTop + height > scrH) {
    top = scrH - height;
  } else {
    top = calcTop;
  }
  const region = new Region(left, top, width, height);
  const scrShot = await screen.grabRegion(region);
  const buf = await scrShot.toRGB();
  return new Promise((resolve, reject) => {
    new Jimp({ data: buf.data, width: width, height: height }, (err, image) => {
      if (err) reject(err);
      resolve(image.getBufferAsync(MIME_PNG).then((b) => b.toString('base64')));
    });
  });
};
