import { config } from 'dotenv';
import { Writable } from 'stream';
import { createWebSocketStream, WebSocket, WebSocketServer } from 'ws';
import { execute } from './cmd';
import { startStreaming } from './streaming';

config();

const cmdResolver = async (request: string, response: Writable) => {
  const splited = request.split('S');
  const result = execute(splited[0], splited.slice(1));
  response.write(result);
  console.log('received: %s result: %s', request, result);
};

const connectionResolver = (ws: WebSocket) => {
  console.log('Client connected');
  const duplex = createWebSocketStream(ws, { encoding: 'utf8' });
  startStreaming(duplex, cmdResolver);

  ws.on('close', (code, reason) => {
    console.log('Client disconnected with code: %s, reason: %s', code, reason);
  });

  ws.on('error', (err) => {
    console.log('Client error', err);
  });
};

export const createServer = async () => {
  const wss = new WebSocketServer({ port: +process.env.PORT || 8080 });

  wss.on('connection', connectionResolver);

  wss.once('listening', () => {
    console.log(`Websocket server start listening on localhost:${wss.options.port}`);
  });

  wss.on('error', (err) => {
    console.log('Server error', err);
  });

  process.once('SIGINT', () => {
    wss.close(() => process.exit());
  });
};

createServer();
