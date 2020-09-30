const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const metricController = require('./controller/hourly-metric-controller');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/metric', metricController);

app.use(function (err, req, res, next) {
  res.status(500).send({
    message: `${err}`
  });
})

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0');
console.log(`Metric app listening at http://localhost:${port}`);
