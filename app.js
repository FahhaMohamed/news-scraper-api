const express = require('express');
const app = express();

const news = require('./routes/news');
const errorMiddleware = require('./middlewares/error');

app.use('/api/v1', news);

app.use(errorMiddleware);

module.exports = app;

