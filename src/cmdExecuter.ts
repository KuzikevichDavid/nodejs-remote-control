import { mouseMove, mousePosition } from './commands/mouse';
import { drawCircle, drawRectangle } from './commands/drawing';
import { getScreen } from './commands/screen';

enum CMD {
  mouse_position = 'mouse_position',
  mouse_up = 'mouse_up',
  mouse_down = 'mouse_down',
  mouse_left = 'mouse_left',
  mouse_right = 'mouse_right',
  draw_rectangle = 'draw_rectangle',
  draw_square = 'draw_square',
  draw_circle = 'draw_circle',
  prnt_scrn = 'prnt_scrn'
}

const response = (cmd: string, result: string): string => `${cmd} ${result}`;

export const execute = async (cmd: string, params?: string[]): Promise<string> => {
  switch (cmd) {
    case CMD.mouse_position:
      return response(cmd, await mousePosition());
    case CMD.mouse_up:
    case CMD.mouse_down:
    case CMD.mouse_right:
    case CMD.mouse_left:
      mouseMove(cmd.split('_')[1], params[0]);
      return;
    case CMD.draw_rectangle:
    case CMD.draw_square:
      drawRectangle(+params[0], +(params[1] || params[0]));
      return;
    case CMD.draw_circle:
      drawCircle(+params[0]);
      return;
    case CMD.prnt_scrn:
      return response(cmd, await getScreen());
    default:
      return;
  }
};
