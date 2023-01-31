import { config } from 'dotenv';
import { Duplex } from 'stream';
import { createWebSocketStream, WebSocket, WebSocketServer } from 'ws';
import { execute } from './cmdExecuter';

const streamResolver = async (request: string, response: Duplex) => {
  const splited = request.split(/\s/);
  const result = await execute(splited[0], splited.slice(1));
  if (result) response.write(result);
  console.log('received: %s response: %s', request, result ?? '');
};

const connectionResolver = (ws: WebSocket) => {
  console.log('Client connected');
  const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });
  duplex.on('data', (data) => streamResolver(data, duplex));

  ws.on('close', (code, reason) => {
    console.log('Client disconnected with code: %s, reason: %s', code, reason);
  });

  ws.on('error', (err) => {
    console.log('Client error', err);
  });
};

const createServer = () => {
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

  return wss;
};

config();

createServer();
