/**
 * Given time string in a format
 * - <number> <period indicators - h for hour, d for day, m for minute, s for second>
 *  returns the period in millisecond.
 *  E.g. getTimePeriodInMillis('2 h') will return 7200000
 * @param timePeriodString
 * @return {number}
 */
const getTimePeriodInMillis = (timePeriodString) => {
  const match = /(\d+)\s*(h|d|s|m)/g.exec(timePeriodString);
  if (!match)
  {
    throw `Unsupported time period format ${timePeriodString}`;
  }

  let timePeriodInMillis = parseInt(match[1]);
  switch (match[2].toLowerCase())
  {
    case 'h': timePeriodInMillis *= 60 * 60 * 1000;
    case 'm': timePeriodInMillis *= 60 * 1000;
    case 'd': timePeriodInMillis *= 24 * 60 * 60 * 1000;
    default: timePeriodInMillis *= 1000;
  }

  return timePeriodInMillis;
}

module.exports = {
  getTimePeriodInMillis
}
