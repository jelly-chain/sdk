# Trigger System Guide

## Built-in Triggers

| Trigger | Class | Use |
|---|---|---|
| Keyword | `KeywordTrigger` | Matches text against keyword lists |
| Event | `EventTrigger` | Matches on-chain event types and fields |
| Threshold | `ThresholdTrigger` | Fires when a metric crosses a value |
| Composite | `CompositeTrigger` | AND/OR combination of triggers |

## Keyword Trigger Example

```ts
import { KeywordTrigger } from 'wmarket-prediction-sdk';

const trigger = new KeywordTrigger(['bridge inflow', 'tvl surge']);
const fired = trigger.evaluate('Massive bridge inflow detected on BSC');
// fired = true
```

## Threshold Trigger Example

```ts
import { ThresholdTrigger } from 'wmarket-prediction-sdk';

const trigger = new ThresholdTrigger([
  { metric: 'bridgeVolumeUSD', operator: 'gt', value: 1_000_000 }
]);
const fired = trigger.evaluate({ bridgeVolumeUSD: 2_000_000 });
// fired = true
```
