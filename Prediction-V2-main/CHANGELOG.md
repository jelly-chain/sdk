# Changelog

All notable changes to WMarket Prediction SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] — 2025-01-01

### Added
- Full pipeline architecture: ingest, enrich, score, aggregate, risk, emit stages.
- Multi-chain support for Ethereum, BNB Smart Chain, Base, and Polygon.
- LlamaFi and BNB Chain MCP provider adapters.
- Off-chain providers: news, sentiment, and macro data clients.
- Trigger engine with keyword, event, threshold, and composite triggers.
- Five built-in prediction strategies: momentum, sentiment, event-driven, mean-reversion, volatility.
- Ensemble modeling with confidence scoring and factor contribution mapping.
- Risk assessment, risk profiles, and risk-gating policies.
- Plugin system with plugin manager, loader, and runtime sandbox.
- Audit logging, decision trails, and access logs.
- Replay engine with snapshot loading and stream rebuilding.
- Storage adapters: in-memory, file, and Redis.
- Telemetry with distributed tracing spans and exporters.
- Security module: secret redaction, rate limiting, webhook signature verification.
- Agent-facing runtime, tool adapter, planner, and response formatter.
- Registry system for providers, strategies, triggers, and models.
- Deduplication for events and signals.
- Time windowing: tumbling, sliding, and session windows.
- Anomaly detection: volume spikes, bridge anomalies, TVL shocks, sentiment outliers.
- Explanation layer: summarizer, factor explainer, risk explainer, confidence explainer.
- Policy engine with risk, confidence, and emit policies.
- Permission system with roles, capabilities, and access control.
- Versioning and backward compatibility utilities.
- Migration helpers for config, schema, and cache.
- Retry system with backoff, circuit breaker, and timeout wrappers.
- Backtesting feature with scenario loader and reporting.
- Simulation feature with what-if scenarios and outcome modeling.
- Portfolio impact analysis: exposure, allocation, and portfolio risk.
- Changeset-based release process.
- Contract tests for public output, event schema, and plugin API.
- Benchmark suite for latency, throughput, cache hit rate, and aggregation.

### Changed
- Complete rewrite from v1. Public API surface updated — see `docs/migration-v2.md`.

## [1.0.0] — 2024-06-01

### Added
- Initial release of Market Prediction SDK v1.
- Basic prediction engine with keyword matching and ensemble model.
- LlamaFi and BNB Chain MCP data sources.
- Support for Ethereum, BSC, Polygon, Arbitrum, Optimism, and Avalanche.
