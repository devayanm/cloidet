const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const http = require('http');
const socketio = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});


connectDB();

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinProject', (projectId) => {
    socket.join(projectId);
    console.log(`User ${socket.id} joined project: ${projectId}`);
  });

  socket.on('fileUpdate', ({ projectId, fileId, content }) => {
    socket.to(projectId).emit('receiveFileUpdate', { fileId, content });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
