/**
 * Service to fetch hourly metric service.
 */
const InMemoryMetricRepository = require("../repositories/InMemoryMetricRepository");
const {getTimePeriodInMillis} = require("../common/date-time-utils");
const logger = require('../common/logger');

module.exports = class MetricService
{
  metricRepository;
  timePeriodToKeepRecordsOf;
  clearOldMetricQueued = false;

  constructor(timePeriodToKeepRecordsOf)
  {
    this.metricRepository = new InMemoryMetricRepository();
    this.timePeriodToKeepRecordsOf = getTimePeriodInMillis(timePeriodToKeepRecordsOf);
  }

  /**
   * Run clear old metric asynchronoulsy, only once when there are multiple requests.
   */
  clearOldMetric()
  {
    if (!this.clearOldMetricQueued)
    {
      setTimeout(() => {
        logger.info('clearing old metric data');
        this.metricRepository.clearOldMetrics(this.timePeriodToKeepRecordsOf);
        this.clearOldMetricQueued = false;
      }, 0);
      this.clearOldMetricQueued = true;
    }
  }

  /**
   * Save given metric value for given key.
   * @param key
   * @param value
   */
  saveMetric(key, value)
  {
    logger.info(`saving metric for ${key}`);
    this.metricRepository.addMetric(key, Math.round(parseFloat(value)), new Date().getTime());
    this.clearOldMetric();
  }

  /**
   * Get sum of metrics of given key.
   * @param key
   * @return {*}
   */
  getSum(key)
  {
    logger.info(`fetching metric sum for ${key}`);
    const metrics = this.metricRepository.getMetrics(key, this.timePeriodToKeepRecordsOf);
    this.clearOldMetric();

    return metrics.map(metric => metric.value).reduce((sum, value) => sum + value, 0);
  }
}
