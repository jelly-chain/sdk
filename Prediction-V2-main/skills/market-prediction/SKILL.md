# WMarket Prediction Skill v2

This skill enables AI agents to generate market predictions using the WMarket Prediction SDK v2.

## Features

- Multi-chain market predictions (Ethereum, BNB, Base, Polygon)
- Keyword-based trigger detection
- Ensemble modeling with confidence scoring
- Risk assessment and policy gating
- Replay, audit, and telemetry support
- Plugin and strategy extension

## Usage

```typescript
import { WMarketPredictor } from 'wmarket-prediction-sdk';

const predictor = new WMarketPredictor({
  chains: ['bsc', 'ethereum'],
  enableRiskAssessment: true,
  enableMetrics: true,
  enableCache: true,
});

const result = await predictor.predict({
  keyword: 'bridge inflow',
  token: 'WBNB',
  chain: 'bsc',
  timeframe: '1h',
});

console.log(result);
```

## Configuration

- `chains` — Supported chain identifiers (required).
- `enableRiskAssessment` — Enable risk scoring (recommended: true).
- `enableMetrics` — Track prediction latency and confidence metrics.
- `enableCache` — Cache recent prediction outputs.
- `enableTelemetry` — Enable distributed tracing.
- `enableAudit` — Log prediction inputs and outputs for auditing.
- `logLevel` — `debug | info | warn | error`
- `cacheOptions` — TTL, maxEntries, and adapter (memory, redis, file).
- `riskOptions` — maxRiskScore, confidenceThreshold, tolerance.

## Skill Presets

- `conservative` — High confidence threshold, low risk tolerance, limited chains.
- `balanced` — Moderate thresholds, multi-chain, ensemble strategies.
- `aggressive` — Low confidence threshold, high risk tolerance, all chains.

## Available Tools

- `wmarket_predict` — Predict market signal for a given keyword, token, and chain.
- `wmarket_chain_data` — Fetch chain-specific data (TVL, bridge flows, gas).
- `wmarket_metrics` — Retrieve current SDK metrics snapshot.
