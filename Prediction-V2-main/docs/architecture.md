# Architecture Overview

## System Layers

```
┌─────────────────────────────────────────────┐
│               Agent / Consumer              │
├─────────────────────────────────────────────┤
│          WMarketPredictor (core)            │
├───────────────────┬─────────────────────────┤
│  Pipeline         │  Plugins & Registry     │
│  (ingest→emit)    │  (strategies, providers)│
├───────────────────┴─────────────────────────┤
│  Providers: LlamaFi | MCP | OnChain | Off   │
├─────────────────────────────────────────────┤
│  Storage | Cache | Audit | Telemetry        │
└─────────────────────────────────────────────┘
```

## Core Pipeline Stages

1. **Ingest** — Pull data from providers, chain sources, and event streams.
2. **Enrich** — Add sentiment, on-chain context, and derived signals.
3. **Score** — Calculate per-factor and aggregate confidence scores.
4. **Aggregate** — Combine strategy outputs through ensemble modeling.
5. **Risk** — Evaluate risk profile and apply thresholds.
6. **Emit** — Build the final output and route to sinks.

## Key Design Decisions

- No singleton state — each `WMarketPredictor` is independent.
- All providers return empty stubs by default — no live API calls without keys.
- Pipeline stages are pure transformations over typed result objects.
- Plugin lifecycle is fully managed (install → start → stop → uninstall).
- All outputs are validated against schemas before being returned.
