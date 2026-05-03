import { describe, it, expect } from 'vitest';
import { WMarketPredictor } from '../../src/predictor.js';
import { BacktestRunner } from '../../src/features/backtesting/backtest-runner.js';
import { ScenarioLoader } from '../../src/features/backtesting/scenario-loader.js';
import { buildBacktestReport } from '../../src/features/backtesting/report.js';

describe('Backtest flow', () => {
  it('should complete a backtest run and produce a valid report', async () => {
    const predictor = new WMarketPredictor({ chains: ['bsc'] });
    const loader = new ScenarioLoader();
    const runner = new BacktestRunner();
    const scenarios = loader.generate(10);
    const results = await runner.run(scenarios, (input) => predictor.predict(input));
    const report = buildBacktestReport(results);
    expect(report.total).toBe(10);
    expect(report.accuracy).toBeGreaterThanOrEqual(0);
    expect(report.avgLatencyMs).toBeGreaterThanOrEqual(0);
    expect(typeof report.summary).toBe('string');
  });
});
