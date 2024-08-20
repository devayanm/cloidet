const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const io = require('socket.io')(server);
io.on('connection', socket => {
  console.log('WebSocket Connected');
});
