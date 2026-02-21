import { Server as HTTPServer } from 'http';
import { Server } from 'socket.io';
import { env } from '../config/env';

export const initSocket = (server: HTTPServer) => {
  const io = new Server(server, { cors: { origin: env.corsOrigin } });

  io.on('connection', (socket) => {
    socket.on('join', (userId: string) => socket.join(userId));
    socket.on('typing', ({ toUserId, fromUserId }) => io.to(toUserId).emit('typing', { fromUserId }));
    socket.on('message:seen', ({ toUserId, messageId }) => io.to(toUserId).emit('message:seen', { messageId }));
    socket.on('notify', ({ toUserId, payload }) => io.to(toUserId).emit('notify', payload));
  });

  return io;
};
