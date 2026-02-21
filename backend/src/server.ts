import http from 'http';
import app from './app';
import { env } from './config/env';
import { initSocket } from './sockets';

const server = http.createServer(app);
initSocket(server);

server.listen(env.port, () => {
  console.log(`Backend running on ${env.port}`);
});
