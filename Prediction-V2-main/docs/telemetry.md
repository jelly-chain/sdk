# Metrics and Tracing Guide

## Metrics

Enable metrics in the SDK config:

```ts
const predictor = new WMarketPredictor({ chains: ['bsc'], enableMetrics: true });
```

Access metrics:

```ts
const metrics = predictor.getMetrics();
console.log(metrics.counters, metrics.gauges, metrics.histograms);
```

## Tracing

The SDK uses an internal `Tracer` that creates spans for each pipeline stage. You can attach a `ConsoleExporter` or `OtelHttpExporter` to forward spans to your observability backend.

```ts
import { ConsoleExporter, registerSpanObserver } from 'wmarket-prediction-sdk';

const exporter = new ConsoleExporter();
registerSpanObserver((span) => {
  exporter.export([span]);
});
```

## Telemetry Configuration

Set in `.env`:

```
OTEL_ENDPOINT=http://localhost:4317
OTEL_SERVICE_NAME=wmarket-prediction-sdk
```
