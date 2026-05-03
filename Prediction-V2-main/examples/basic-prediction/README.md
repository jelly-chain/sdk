# Basic Prediction Example

This example shows the minimal setup to generate a prediction using the WMarket Prediction SDK v2.

## Run

```bash
npx tsx examples/basic-prediction/index.ts
```

## What it does

1. Instantiates `WMarketPredictor` with BSC and Ethereum chains.
2. Runs a prediction for the keyword `bridge inflow` on BSC.
3. Prints the structured prediction result and metrics.
