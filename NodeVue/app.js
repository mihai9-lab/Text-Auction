const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const router = require('./routes');
const cors = require('cors');
const app = express();
const CronJob = require('cron').CronJob;
const { models } = require('./db');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', router);
const staticMiddleware = express.static(path.join(__dirname, 'dist'));
app.use(staticMiddleware);
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname,'dist','index.html'));
});
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).send();
});

new CronJob('0 0 0 * * *', async () => {
    const users = await models.user.findAll();
    users.forEach((user) => {
        user.increment({ tokens: 1000 });
    });
}).start();
module.exports = app;
