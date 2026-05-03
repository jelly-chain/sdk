# Replay and Auditing Guide

## Replay Engine

The `ReplayEngine` allows you to re-run historical events through the prediction pipeline.

```ts
import { ReplayEngine, SnapshotLoader, buildReplayReport } from 'wmarket-prediction-sdk';

const engine = new ReplayEngine();
const snapshots = new SnapshotLoader();

const snapshot = snapshots.save(historicalEvents);
const result = await engine.replay(snapshot.events, async (event) => {
  await predictor.predict({ chain: event.chain });
});

const report = buildReplayReport(result, snapshot.events.length, snapshot.id);
console.log(report.summary);
```

## Audit Log

```ts
const predictor = new WMarketPredictor({ chains: ['bsc'], enableAudit: true });
const result = await predictor.predict({ keyword: 'bridge inflow' });
// Prediction is automatically logged to the audit log
```
