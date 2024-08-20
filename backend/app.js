const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));

module.exports = app;
