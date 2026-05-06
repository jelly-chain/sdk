/** Statistical scoring functions for backtest evaluation. */

export function brierScore(predictions: number[], actuals: number[]): number {
  if (predictions.length !== actuals.length || predictions.length === 0) return 0;
  const sum = predictions.reduce((s, p, i) => s + Math.pow(p - (actuals[i] ?? 0), 2), 0);
  return sum / predictions.length;
}

export function logLoss(predictions: number[], actuals: number[]): number {
  if (predictions.length !== actuals.length || predictions.length === 0) return 0;
  const sum = predictions.reduce((s, p, i) => {
    const y = actuals[i] ?? 0;
    const clampedP = Math.max(1e-10, Math.min(1 - 1e-10, p));
    return s - (y * Math.log(clampedP) + (1 - y) * Math.log(1 - clampedP));
  }, 0);
  return sum / predictions.length;
}

export function accuracy(predictions: number[], actuals: number[], threshold = 0.5): number {
  if (predictions.length !== actuals.length || predictions.length === 0) return 0;
  const correct = predictions.filter((p, i) => {
    const pred = p >= threshold ? 1 : 0;
    const actual = (actuals[i] ?? 0) >= threshold ? 1 : 0;
    return pred === actual;
  }).length;
  return correct / predictions.length;
}

export function calibrationError(predictions: number[], actuals: number[], bins = 10): number {
  const binSize = 1 / bins;
  let ece = 0;
  const n = predictions.length;

  for (let b = 0; b < bins; b++) {
    const lo = b * binSize;
    const hi = (b + 1) * binSize;
    const inBin = predictions
      .map((p, i) => ({ p, a: actuals[i] ?? 0 }))
      .filter(({ p }) => p >= lo && p < hi);
    if (inBin.length === 0) continue;
    const avgConf = inBin.reduce((s, { p }) => s + p, 0) / inBin.length;
    const avgAcc = inBin.reduce((s, { a }) => s + a, 0) / inBin.length;
    ece += (inBin.length / n) * Math.abs(avgConf - avgAcc);
  }
  return ece;
}
