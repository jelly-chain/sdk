# Backtesting Guide

## Quick Start

```ts
import { BacktestRunner, ScenarioLoader, buildBacktestReport } from 'wmarket-prediction-sdk';

const loader = new ScenarioLoader();
const scenarios = loader.generate(20);

const runner = new BacktestRunner();
const results = await runner.run(scenarios, (input) => predictor.predict(input));
const report = buildBacktestReport(results);

console.log(report.summary);
```

## Loading Real Scenarios

```ts
const scenarios = loader.fromJSON([
  { id: 's1', input: { keyword: 'bridge inflow', chain: 'bsc' }, actualOutcome: 'bullish', timestamp: '2025-01-01T00:00:00Z' },
  { id: 's2', input: { keyword: 'rug pull', chain: 'bsc' }, actualOutcome: 'bearish', timestamp: '2025-01-02T00:00:00Z' },
]);
```

## Interpreting Results

The `BacktestReport` includes:
- `accuracy` — overall prediction accuracy.
- `bySignal` — accuracy broken down per signal direction.
- `avgLatencyMs` — average prediction latency.
- `summary` — human-readable summary string.
