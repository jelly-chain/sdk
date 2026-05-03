# Migration Guide — v1 to v2

## Breaking Changes

### Config shape

v1 used `dataSources` and `keywords` at the top level. v2 uses `chains`, `providers`, and `plugins`.

**v1:**
```ts
new MarketPredictor({ dataSources: ['llama-fi'], keywords: ['TVL surge'] });
```

**v2:**
```ts
new WMarketPredictor({ chains: ['bsc', 'ethereum'], enableRiskAssessment: true });
```

### Class name

`MarketPredictor` → `WMarketPredictor`

### Output shape

v1 returned a flat object. v2 returns a structured `PredictionOutput` with `signal`, `confidence`, `riskScore`, `factors`, `explanations`, and `metadata`.

### Import paths

v1: `import { MarketPredictor } from 'market-prediction-sdk'`  
v2: `import { WMarketPredictor } from 'wmarket-prediction-sdk'`

## Automated Migration

Use the built-in config migration utility:

```ts
import { migrateConfig } from 'wmarket-prediction-sdk';
const v2Config = migrateConfig(myV1Config, '1.0.0', '2.0.0');
```
