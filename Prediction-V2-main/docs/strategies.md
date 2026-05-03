# Strategy Authoring Guide

## Built-in Strategies

| Strategy | Class | Signal Basis |
|---|---|---|
| Momentum | `MomentumStrategy` | Trend direction and strength |
| Sentiment | `SentimentStrategy` | Social and news sentiment |
| Event-driven | `EventDrivenStrategy` | On-chain event presence |
| Mean Reversion | `MeanReversionStrategy` | Deviation from historical mean |
| Volatility | `VolatilityStrategy` | Realized volatility regime |

## Writing a Custom Strategy

```ts
import { BaseStrategy } from 'wmarket-prediction-sdk';

export class MyCustomStrategy extends BaseStrategy {
  readonly name = 'my-custom';
  readonly description = 'Checks whale wallet movements';

  async run(input, context) {
    // your logic here
    return {
      signal: 'bullish',
      confidence: 0.7,
      factors: ['whale-accumulation'],
      explanations: ['Large wallets are accumulating'],
    };
  }
}
```

Then register it:

```ts
import { strategyRegistry } from 'wmarket-prediction-sdk';
strategyRegistry.register(new MyCustomStrategy());
```
