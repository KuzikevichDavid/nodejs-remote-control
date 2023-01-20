import { mouse, Point } from '@nut-tree/nut-js';

export namespace commands {
  export const mousePosition = async (): Promise<string> => {
    return mouse.getPosition().then((p) => `${p.x},${p.y}`);
  };

  export const mouseMove = async (direction: string, px: string) => {
    const position = await mouse.getPosition();
    switch (direction) {
      case 'up':
        position.y -= +px || 0;
        break;
      case 'down':
        position.y += +px || 0;
        break;
      case 'left':
        position.x -= +px || 0;
        break;
      case 'right':
        position.x += +px || 0;
        break;
      default:
        break;
    }
    mouse.setPosition(position);
  };
}
