enum CMD {
  mouse_position = 'mouse_position',
  mouse_up = 'mouse_up',
  mouse_down = 'mouse_down',
  mouse_left = 'mouse_left',
  mouse_right = 'mouse_right'
}

import { commands } from './commands/mouse';

const response = (cmd: string, result: string): string => `${cmd} ${result}`;

export const execute = async (cmd: string, params?: string[]): Promise<string> => {
  switch (cmd) {
    case CMD.mouse_position:
      return response(cmd, await commands.mousePosition());
    case CMD.mouse_up:
    case CMD.mouse_down:
    case CMD.mouse_right:
    case CMD.mouse_left:
      commands.mouseMove(cmd.split('_')[1], params[0]);
      return;
    default:
      return;
  }
};
