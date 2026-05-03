import { describe, it, expect } from 'vitest';
import { WMarketPredictor } from '../src/predictor.js';
import { BacktestRunner } from '../src/features/backtesting/backtest-runner.js';
import { ScenarioLoader } from '../src/features/backtesting/scenario-loader.js';
import { buildBacktestReport } from '../src/features/backtesting/report.js';

describe('Integration: Backtesting', () => {
  it('should run backtest and produce a report', async () => {
    const predictor = new WMarketPredictor({ chains: ['bsc'] });
    const loader = new ScenarioLoader();
    const runner = new BacktestRunner();
    const scenarios = loader.generate(5);
    const results = await runner.run(scenarios, (input) => predictor.predict(input));
    const report = buildBacktestReport(results);
    expect(report.total).toBe(5);
    expect(report.accuracy).toBeGreaterThanOrEqual(0);
    expect(report.accuracy).toBeLessThanOrEqual(1);
    expect(report.summary).toContain('Accuracy');
  });
});
