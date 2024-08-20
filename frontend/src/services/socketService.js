import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

export const sendUpdate = (data) => {
  socket.emit('update', data);
};

export default socket;
