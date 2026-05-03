# Getting Started

## Installation

```bash
npm install wmarket-prediction-sdk
```

## Quick Start

```ts
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

## Environment Variables

Copy `.env.example` to `.env` and fill in your keys:

```bash
cp .env.example .env
```

See `.env.example` for all available variables.

## Next Steps

- Read [Configuration](./configuration.md) for all config options.
- Read [Providers](./providers.md) to connect to live data sources.
- Read [Plugins](./plugins.md) to add custom strategies.
- Read [Backtesting](./backtesting.md) to validate prediction quality.
