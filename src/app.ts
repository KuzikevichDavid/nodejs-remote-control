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

const onData = async (request: string): Promise<string> => {
  const splited = request.split(/\s/);
  const result = await execute(splited[0], splited.slice(1));
  console.log('received: %s result: %s', request, result ?? '');
  return result;
};

const connectionResolver = (ws: WebSocket) => {
  console.log('Client connected');
  //const duplex = createWebSocketStream(ws, { encoding: 'utf8' });
  //startStreaming(duplex, cmdResolver);
  //duplex.on('data', (data) => cmdResolver(data, duplex))

  ws.on('message', async (data) => {
    const result = await onData(data.toString());
    if (result) ws.send(result);
  });

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

const wss = createServer();
