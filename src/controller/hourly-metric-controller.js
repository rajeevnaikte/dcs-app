/**
 * Controller function for metric service.
 */
const express = require('express');
const MetricService = require('../service/MetricService');
const hourlyMetricService = new MetricService('1h');

const router = express.Router();

/**
 * Save user metric.
 * @param req
 * @param res
 */
function addMetric(req, res)
{
  const metricKey = req.params.key;
  const metricValue = req.body.value;

  hourlyMetricService.saveMetric(metricKey, metricValue);

  res.json({});
}

/**
 * Get metric sum for last 1 hour.
 * @param req
 * @param res
 */
function getMetricSum(req, res)
{
  const metricKey = req.params.key;

  res.json({
    value: hourlyMetricService.getSum(metricKey)
  });
}

/**
 * Builds a higher level function which routes to a controller function (given as parameter) and calls next().
 * @param controllerFunction
 * @return {function(*=, *=, *): void}
 */
function routeAndMoveNext(controllerFunction)
{
  return (req, res, next) => {
    controllerFunction(req, res);
    next();
  }
}

router.post('/:key', routeAndMoveNext(addMetric));
router.get('/:key/sum', routeAndMoveNext(getMetricSum));

module.exports = router;
