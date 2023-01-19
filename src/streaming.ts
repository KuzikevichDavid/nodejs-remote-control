import { Duplex, EventEmitter, Readable, Writable } from 'stream';

const read = async (dataStream: Readable): Promise<string> => {
  const data: string[] = [];
  let chunk: string;
  while ((chunk = dataStream.read()) !== null) {
    data.push(chunk);
  }
  return data.join('');
};

export const startStreaming = async (
  stream: Duplex,
  dataListener: (request: string, response: Writable) => void
) => {
  const emitter = new EventEmitter();
  emitter.on('data', dataListener);

  stream.on('readable', async () => {
    const data = await read(stream);
    if (data !== '') emitter.emit('data', data, stream);
  });
};
