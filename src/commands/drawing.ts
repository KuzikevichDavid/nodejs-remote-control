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
}
