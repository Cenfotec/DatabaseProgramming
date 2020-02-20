const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const userRoutes = require('./api/routes/users');
const gameRoutes = require('./api/routes/games');
const lettersRoutes = require('./api/routes/letters');

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/letters', lettersRoutes);
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;