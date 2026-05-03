import type { BacktestScenario } from './backtest-runner.js';

export class ScenarioLoader {
  fromJSON(data: unknown[]): BacktestScenario[] {
    return data.map((item, i) => {
      const d = item as Record<string, unknown>;
      return {
        id: (d['id'] as string) ?? `scenario_${i}`,
        input: (d['input'] as BacktestScenario['input']) ?? {},
        actualOutcome: (d['actualOutcome'] as string) ?? 'neutral',
        timestamp: (d['timestamp'] as string) ?? new Date().toISOString(),
      };
    });
  }

  generate(count: number): BacktestScenario[] {
    const outcomes = ['bullish', 'bearish', 'neutral'];
    return Array.from({ length: count }, (_, i) => ({
      id: `gen_scenario_${i}`,
      input: { keyword: 'bridge inflow', chain: 'bsc' as const, timeframe: '1h' as const },
      actualOutcome: outcomes[i % 3] ?? 'neutral',
      timestamp: new Date(Date.now() - i * 3_600_000).toISOString(),
    }));
  }
}
