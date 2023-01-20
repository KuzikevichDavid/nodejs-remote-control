import { mouse, Point, straightTo } from '@nut-tree/nut-js';

export namespace drawCommands {
  mouse.config.mouseSpeed = 100;

  export const drawRectangle = async (width: number, height: number) => {
    const start = await mouse.getPosition();
    const targets = [
      new Point(start.x + width, start.y),
      new Point(start.x + width, start.y + height),
      new Point(start.x, start.y + height),
      start
    ];
    const rectangle = new Array<Point>();

    for (let i = 0; i < targets.length; i++) {
      const path = await straightTo(targets[i]);
      rectangle.push(...path);
      await mouse.setPosition(targets[i]);
    }
    await mouse.drag(rectangle);
  };

  export const drawCircle = async (radius: number) => {
    const start = await mouse.getPosition();
    const x = start.x,
      y = start.y + radius;
    const circleSectors = new Array<Array<Point>>(8);
    for (let i = 0; i < circleSectors.length; i++) circleSectors[i] = new Array<Point>();
    let X = 0,
      Y = radius,
      delta = 3 - 2 * radius,
      error = 0;
    while (X <= Y) {
      circleSectors[3].push(new Point(x + X, y + Y));
      circleSectors[4].push(new Point(x - X, y + Y));
      circleSectors[0].push(new Point(x + X, y - Y));
      circleSectors[7].push(new Point(x - X, y - Y));
      circleSectors[2].push(new Point(x + Y, y + X));
      circleSectors[5].push(new Point(x - Y, y + X));
      circleSectors[1].push(new Point(x + Y, y - X));
      circleSectors[6].push(new Point(x - Y, y - X));
      error = 2 * (delta + Y) - 1;
      if (delta < 0 && error <= 0) {
        delta += 2 * ++X + 1;
        continue;
      }
      if (delta > 0 && error > 0) {
        delta -= 2 * --Y + 1;
        continue;
      }
      delta += 2 * (++X - --Y);
    }
    circleSectors.forEach((val, i, array) => {
      if (i % 2 === 1) array[i] = array[i].reverse();
    });
    const circle = circleSectors.flat();
    await mouse.drag(circle);
  };
}
