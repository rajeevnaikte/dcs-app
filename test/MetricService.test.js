const MetricService = require("../src/service/MetricService");

describe('Metric Controller test', () => {
  test('save metric', () => {
    const metricSrvice = new MetricService('1h');

    metricSrvice.saveMetric('test', 100);
    metricSrvice.saveMetric('test', 200);

    const metricsFromStore = metricSrvice.metricRepository.metricStore['test'];
    expect(metricsFromStore).toBeDefined();
    expect(metricsFromStore.map(metric => metric.value)).toEqual([100, 200]);
  });

  test('save decimal metric', () => {
    const metricSrvice = new MetricService('1h');

    metricSrvice.saveMetric('test', 100.4);
    metricSrvice.saveMetric('test', 100.6);

    const metricsFromStore = metricSrvice.metricRepository.metricStore['test'];
    expect(metricsFromStore).toBeDefined();
    expect(metricsFromStore.map(metric => metric.value)).toEqual([100, 101]);
  });

  test('get metric sum', () => {
    const metricSrvice = new MetricService('1h');

    metricSrvice.saveMetric('test', 100);
    metricSrvice.saveMetric('test', 200);

    expect(metricSrvice.getSum('test')).toEqual(300);
  });

  test('get metric sum upto last 1h', async () => {
    const metricSrvice = new MetricService('1s');

    metricSrvice.saveMetric('test', 100);

    await new Promise(resolve => setTimeout(() => resolve(), 1000));

    metricSrvice.saveMetric('test', 200);

    expect(metricSrvice.getSum('test')).toEqual(200);
  });
});