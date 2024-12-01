const express = require('express');
const app = express();

const news = require('./routes/news');

app.use('/api/v1', news);

module.exports = app;

