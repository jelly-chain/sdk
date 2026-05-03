export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function safeDiv(numerator: number, denominator: number, fallback = 0): number {
  if (denominator === 0 || !isFinite(denominator)) return fallback;
  return numerator / denominator;
}

export function weightedAverage(values: number[], weights: number[]): number {
  if (values.length !== weights.length) throw new Error('Values and weights must have equal length');
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  if (totalWeight === 0) return 0;
  const sum = values.reduce((acc, v, i) => acc + v * (weights[i] ?? 0), 0);
  return safeDiv(sum, totalWeight);
}

export function normalize(value: number, min: number, max: number): number {
  return safeDiv(value - min, max - min);
}

export function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function percentChange(from: number, to: number): number {
  return safeDiv((to - from), Math.abs(from)) * 100;
}

export function stdDev(values: number[]): number {
  if (values.length === 0) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / values.length;
  return Math.sqrt(variance);
}
