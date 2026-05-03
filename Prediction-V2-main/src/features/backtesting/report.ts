import type { BacktestResult } from './backtest-runner.js';

export interface BacktestReport {
  total: number;
  correct: number;
  accuracy: number;
  avgLatencyMs: number;
  bySignal: Record<string, { correct: number; total: number; accuracy: number }>;
  summary: string;
}

export function buildBacktestReport(results: BacktestResult[]): BacktestReport {
  const total = results.length;
  const correct = results.filter((r) => r.correct).length;
  const accuracy = total > 0 ? correct / total : 0;
  const avgLatencyMs = total > 0 ? results.reduce((a, b) => a + b.latencyMs, 0) / total : 0;
  const bySignal: Record<string, { correct: number; total: number; accuracy: number }> = {};
  for (const result of results) {
    const key = result.predicted.signal;
    if (!bySignal[key]) bySignal[key] = { correct: 0, total: 0, accuracy: 0 };
    bySignal[key]!.total++;
    if (result.correct) bySignal[key]!.correct++;
    bySignal[key]!.accuracy = bySignal[key]!.correct / bySignal[key]!.total;
  }
  return {
    total, correct, accuracy,
    avgLatencyMs: Math.round(avgLatencyMs),
    bySignal,
    summary: `Accuracy: ${(accuracy * 100).toFixed(1)}% (${correct}/${total}) — avg latency: ${Math.round(avgLatencyMs)}ms`,
  };
}
