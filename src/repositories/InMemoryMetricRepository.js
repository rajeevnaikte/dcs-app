/**
 * Metric repository which persists data in-memory.
 */
module.exports = class InMemoryMetricRepository
{
  metricStore = {};

  /**
   * Save the metric for given key in store.
   * @param key
   * @param value
   * @param addedAt - in milliseconds
   */
  addMetric(key, value, addedAt)
  {
    this.metricStore[key] = this.metricStore[key] || [];
    this.metricStore[key].push({
      value,
      addedAt
    });
  }

  /**
   * Get the metrics added for the given key upto specified time period.
   * If not specified return all.
   * @param key
   * @param timePeriodUpto - in milliseconds
   */
  getMetrics(key, timePeriodUpto)
  {
    if (!this.metricStore[key])
    {
      throw `No metric for "${key}" found.`
    }

    return timePeriodUpto ? this.getMetricsUpto(key, timePeriodUpto) : this.metricStore[key];
  }

  /**
   * Get all the metrics of given key upto specified time period.
   * @param key
   * @param timePeriodUpto
   * @return {[]}
   */
  getMetricsUpto(key, timePeriodUpto)
  {
    const result = [];
    const metrics = this.metricStore[key];
    const timeNow = new Date().getTime();
    for (let i = metrics.length - 1; i >= 0; i--)
    {
      const metric = metrics[i];
      if ((timeNow - metric.addedAt) <= timePeriodUpto)
      {
        result.push(metric);
      }
      else
      {
        // Since adding data is in time order, later records will be older ones.
        break;
      }
    }

    return result;
  }

  /**
   * Clear records older than given time period.
   * @param keepUptoTimePeriod - in milliseconds.
   */
  clearOldMetrics(keepUptoTimePeriod)
  {
    for (const key in this.metricStore)
    {
      this.metricStore[key] = this.getMetricsUpto(key, keepUptoTimePeriod);
    }
  }
}
