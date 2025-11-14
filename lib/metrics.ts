import { RunData } from './types';

export const calculateMetrics = (data: RunData[]) => {
  if (data.length === 0) {
    return { totalMiles: 0, average: 0, min: 0, max: 0, totalRuns: 0 };
  }

  const miles = data.map(d => d.miles);
  const totalMiles = miles.reduce((sum, val) => sum + val, 0);
  const average = totalMiles / data.length;
  const min = Math.min(...miles);
  const max = Math.max(...miles);

  return {
    totalMiles: parseFloat(totalMiles.toFixed(2)),
    average: parseFloat(average.toFixed(2)),
    min,
    max,
    totalRuns: data.length
  };
};