# WMarket Prediction SDK v2

An open-source TypeScript SDK for AI agents that generate market predictions using real-world data, on-chain activity, prediction market orderbooks, event triggers, and keyword-based signals. WMarket Prediction SDK v2 is built for multi-chain, event-aware prediction workflows with a modular architecture that supports extensibility, observability, replayability, and production-grade automation.

## Overview

WMarket Prediction SDK v2 helps developers build intelligent systems that react to market conditions in real time. It combines external APIs, blockchain event monitoring, prediction market data (Polymarket, Kalshi, predict.fun), DEX and DeFi analytics, trigger engines, ensemble modeling, risk analysis, caching, metrics, plugin support, and agent-facing utilities into a unified prediction framework.

This version expands the SDK from a simple prediction tool into a full prediction infrastructure layer. It is designed not only to generate signals, but also to support routing, replay, auditing, testing, backtesting, and custom strategy development across multiple chains, data sources, and prediction market venues.

## Core Capabilities

- Real-time data ingestion from off-chain APIs, on-chain events, and market data providers.
- **Prediction market integration:** live orderbook data and implied probabilities from Polymarket, Kalshi, and predict.fun with cross-market divergence detection.
- **DeFi analytics integration:** TVL, yield, and protocol health signals via DeFiLlama, Aave, Uniswap, and GMX.
- **NFT market signals:** collection floor price momentum, volume trends, and whale accumulation via OpenSea.
- **Cross-exchange price data:** spot prices, funding rates, and open interest from OKX, Binance, and Hyperliquid.
- **On-chain oracle data:** tamper-resistant price feeds from Chainlink across all major EVM chains.
- Event-driven prediction workflows for launches, TVL changes, bridge flows, liquidity shifts, and other protocol activity.
- Multi-chain support across BNB Chain, Ethereum, Base, Arbitrum, Polygon, Solana, and all major EVM-compatible networks.
- Keyword-based and condition-based triggers for automated prediction execution.
- Ensemble modeling that combines multiple strategies into a single prediction output.
- Integrated risk assessment for confidence scoring and downside evaluation.
- Caching and storage layers for lower latency and more efficient execution.
- Metrics, telemetry, and audit trails for performance tracking and operational visibility.
- Replay and checkpointing support for debugging, historical analysis, and deterministic workflows.
- Plugin and registry systems for extending providers, triggers, strategies, and prediction modules.
- Agent-facing interfaces for AI workflows, tool adapters, and structured prediction output.

## Why v2

Version 2 introduces a more complete prediction pipeline built for serious market automation. Instead of treating prediction as a single function call, v2 organizes the system around ingestion, normalization, triggering, scoring, aggregation, risk evaluation, policy checks, output routing, and performance monitoring.

v2 also adds a comprehensive **prediction market data layer** that feeds live Polymarket, Kalshi, and predict.fun implied probabilities directly into the signal pipeline, enabling cross-venue divergence arbitrage and news-driven mispricing detection as first-class features.

Additional infrastructure makes the SDK more production-ready: schema validation, replay tooling, audit logs, plugin runtime support, contract tests, and benchmark tooling make it better suited for teams building long-lived agent systems and market intelligence products.

## Input Structure

```text
market-prediction-sdk/
├── src/
│   ├── index.ts                             # Public SDK entry point
│   ├── predictor.ts                         # Prediction orchestration engine
│   ├── data-fetcher.ts                      # External API and chain data integrations
│   ├── types.ts                             # Shared TypeScript interfaces and types
│   ├── config.ts                            # Runtime configuration management
│   ├── logger.ts                            # Structured logging utilities
│   ├── events.ts                            # Event detection and dispatch
│   ├── cache.ts                             # Caching layer for repeated lookups
│   ├── validators.ts                        # Input and config validation
│   ├── metrics.ts                           # Performance and accuracy tracking
│   │
│   ├── constants/
│   │   ├── index.ts                         # Shared constants exports
│   │   ├── chains.ts                        # Supported chains and IDs
│   │   ├── thresholds.ts                    # Confidence and risk thresholds
│   │   ├── keywords.ts                      # Default keyword trigger lists
│   │   └── events.ts                        # Event names and routing keys
│   │
│   ├── utils/
│   │   ├── index.ts                         # Utility exports
│   │   ├── dates.ts                         # Time parsing and window helpers
│   │   ├── math.ts                          # Safe math and scoring helpers
│   │   ├── strings.ts                       # String normalization utilities
│   │   ├── hashes.ts                        # Hashing and fingerprinting
│   │   └── async.ts                         # Async control helpers
│   │
│   ├── errors/
│   │   ├── index.ts                         # Error exports
│   │   ├── base-error.ts                    # Base SDK error
│   │   ├── validation-error.ts              # Invalid input/config errors
│   │   ├── provider-error.ts                # Upstream provider failures
│   │   ├── prediction-error.ts              # Prediction execution failures
│   │   ├── timeout-error.ts                 # Timeout-specific failures
│   │   └── risk-error.ts                    # Risk gating or threshold failures
│   │
│   ├── models/
│   │   ├── index.ts                         # Internal model exports
│   │   ├── market-signal.ts                 # Normalized signal model
│   │   ├── prediction-result.ts             # Final prediction result model
│   │   ├── risk-profile.ts                  # Risk model definition
│   │   ├── event-payload.ts                 # Event payload model
│   │   └── provider-response.ts             # Provider response abstractions
│   │
│   ├── schemas/
│   │   ├── index.ts                         # Schema exports
│   │   ├── input.schema.ts                  # Prediction input schema
│   │   ├── output.schema.ts                 # Prediction output schema
│   │   ├── event.schema.ts                  # Event payload schema
│   │   ├── config.schema.ts                 # Runtime config schema
│   │   └── provider.schema.ts               # External provider payload schemas
│   │
│   ├── normalizers/
│   │   ├── index.ts                         # Normalizer exports
│   │   ├── market-data-normalizer.ts        # Real-world data normalization
│   │   ├── event-normalizer.ts              # Event payload normalization
│   │   ├── sentiment-normalizer.ts          # Sentiment normalization
│   │   └── chain-data-normalizer.ts         # On-chain data normalization
│   │
│   ├── providers/
│   │   ├── index.ts                         # Provider registry exports
│   │   ├── base-provider.ts                 # Provider interface/base class
│   │   ├── provider-manager.ts              # Provider lifecycle coordination
│   │   ├── llamafi/
│   │   │   ├── client.ts                    # LLamaFi API client
│   │   │   ├── adapter.ts                   # LLamaFi to internal model adapter
│   │   │   ├── types.ts                     # LLamaFi-specific types
│   │   │   └── validators.ts                # LLamaFi payload validators
│   │   ├── mcp/
│   │   │   ├── client.ts                    # BNB Chain MCP client
│   │   │   ├── adapter.ts                   # MCP to internal model adapter
│   │   │   ├── types.ts                     # MCP-specific types
│   │   │   └── validators.ts                # MCP validation rules
│   │   ├── onchain/
│   │   │   ├── rpc-client.ts                # RPC abstraction
│   │   │   ├── log-reader.ts                # Event log readers
│   │   │   ├── multicall.ts                 # Batched chain reads
│   │   │   └── decoder.ts                   # ABI/event decoding helpers
│   │   └── offchain/
│   │       ├── news-client.ts               # News/social feed client
│   │       ├── sentiment-client.ts          # External sentiment APIs
│   │       └── macro-client.ts              # Macro/market data APIs
│   │
│   ├── chains/
│   │   ├── index.ts                         # Chain exports
│   │   ├── registry.ts                      # Supported chain registry
│   │   ├── chain-config.ts                  # Per-chain config
│   │   ├── explorers.ts                     # Explorer URLs and mappings
│   │   ├── rpc.ts                           # RPC endpoint presets
│   │   └── evm/
│   │       ├── ethereum.ts                  # Ethereum chain definition
│   │       ├── bsc.ts                       # BNB Smart Chain definition
│   │       ├── base.ts                      # Base chain definition
│   │       └── polygon.ts                   # Polygon chain definition
│   │
│   ├── triggers/
│   │   ├── index.ts                         # Trigger exports
│   │   ├── trigger-engine.ts                # Trigger evaluation engine
│   │   ├── keyword-trigger.ts               # Keyword trigger logic
│   │   ├── event-trigger.ts                 # Event-based trigger logic
│   │   ├── threshold-trigger.ts             # Threshold crossing triggers
│   │   └── composite-trigger.ts             # Multi-condition triggers
│   │
│   ├── pipeline/
│   │   ├── index.ts                         # Pipeline exports
│   │   ├── ingest-stage.ts                  # Data ingestion stage
│   │   ├── enrich-stage.ts                  # Signal enrichment stage
│   │   ├── score-stage.ts                   # Score calculation stage
│   │   ├── aggregate-stage.ts               # Ensemble aggregation stage
│   │   ├── risk-stage.ts                    # Risk evaluation stage
│   │   └── emit-stage.ts                    # Final output/dispatch stage
│   │
│   ├── scoring/
│   │   ├── index.ts                         # Scoring exports
│   │   ├── confidence-scorer.ts             # Confidence score calculations
│   │   ├── factor-weighter.ts               # Signal weighting logic
│   │   ├── calibration.ts                   # Score calibration tools
│   │   └── contribution-map.ts              # Per-factor score contribution
│   │
│   ├── strategies/
│   │   ├── index.ts                         # Strategy exports
│   │   ├── base-strategy.ts                 # Strategy interface/base class
│   │   ├── momentum-strategy.ts             # Trend/momentum strategy
│   │   ├── sentiment-strategy.ts            # Sentiment-first strategy
│   │   ├── event-driven-strategy.ts         # Event-reactive strategy
│   │   ├── mean-reversion-strategy.ts       # Mean reversion strategy
│   │   └── volatility-strategy.ts           # Volatility-based strategy
│   │
│   ├── hooks/
│   │   ├── index.ts                         # Hook exports
│   │   ├── before-fetch.ts                  # Hook before upstream fetch
│   │   ├── after-fetch.ts                   # Hook after upstream fetch
│   │   ├── before-predict.ts                # Hook before prediction run
│   │   ├── after-predict.ts                 # Hook after prediction run
│   │   └── on-risk-alert.ts                 # Hook on elevated risk
│   │
│   ├── storage/
│   │   ├── index.ts                         # Storage exports
│   │   ├── storage-adapter.ts               # Storage interface
│   │   ├── memory-store.ts                  # In-memory store
│   │   ├── file-store.ts                    # Local file storage
│   │   ├── redis-store.ts                   # Redis-backed storage
│   │   └── metrics-store.ts                 # Metrics persistence
│   │
│   ├── telemetry/
│   │   ├── index.ts                         # Telemetry exports
│   │   ├── tracer.ts                        # Distributed tracing hooks
│   │   ├── spans.ts                         # Span definitions
│   │   ├── observers.ts                     # Runtime observers
│   │   └── exporters.ts                     # Telemetry sink adapters
│   │
│   ├── security/
│   │   ├── index.ts                         # Security exports
│   │   ├── secrets.ts                       # Secret loading and redaction
│   │   ├── permissions.ts                   # Capability/permission checks
│   │   ├── rate-limit.ts                    # Rate-limit controls
│   │   └── webhook-signatures.ts            # Signed webhook verification
│   │
│   ├── agents/
│   │   ├── index.ts                         # Agent-facing exports
│   │   ├── agent-runtime.ts                 # Agent execution wrapper
│   │   ├── planner.ts                       # Agent planning logic
│   │   ├── tool-adapter.ts                  # SDK as agent tool adapter
│   │   └── response-formatter.ts            # Agent-friendly output shaping
│   │
│   ├── registry/
│   │   ├── index.ts                         # Registry exports
│   │   ├── provider-registry.ts             # Provider lookup registry
│   │   ├── strategy-registry.ts             # Strategy lookup registry
│   │   ├── trigger-registry.ts              # Trigger lookup registry
│   │   └── model-registry.ts                # Model/component registry
│   │
│   ├── plugins/
│   │   ├── index.ts                         # Plugin exports
│   │   ├── plugin.ts                        # Plugin contract
│   │   ├── plugin-manager.ts                # Plugin lifecycle manager
│   │   ├── plugin-loader.ts                 # Dynamic plugin loader
│   │   └── builtins/
│   │       ├── keyword-plugin.ts            # Built-in keyword plugin
│   │       ├── event-plugin.ts              # Built-in event plugin
│   │       └── sentiment-plugin.ts          # Built-in sentiment plugin
│   │
│   ├── plugin-runtime/
│   │   ├── index.ts                         # Runtime exports
│   │   ├── sandbox.ts                       # Plugin execution sandbox
│   │   ├── lifecycle.ts                     # Install/start/stop hooks
│   │   ├── dependency-resolver.ts           # Plugin dependency management
│   │   └── capabilities.ts                  # Plugin capability declarations
│   │
│   ├── audit/
│   │   ├── index.ts                         # Audit exports
│   │   ├── audit-log.ts                     # Prediction audit log writer
│   │   ├── decision-trail.ts                # Factor-by-factor decision trail
│   │   ├── access-log.ts                    # Access and runtime event audit
│   │   └── audit-reader.ts                  # Audit log query utilities
│   │
│   ├── replay/
│   │   ├── index.ts                         # Replay exports
│   │   ├── replay-engine.ts                 # Event replay engine
│   │   ├── snapshot-loader.ts               # Snapshot restore support
│   │   ├── stream-rebuilder.ts              # Stream reconstruction tools
│   │   └── replay-report.ts                 # Replay outcome reporting
│   │
│   ├── projections/
│   │   ├── index.ts                         # Projection exports
│   │   ├── market-state.ts                  # Current market state projection
│   │   ├── liquidity-state.ts               # Liquidity state projection
│   │   ├── bridge-flow-state.ts             # Bridge activity projection
│   │   └── chain-health-state.ts            # Chain/system health projection
│   │
│   ├── router/
│   │   ├── index.ts                         # Router exports
│   │   ├── event-router.ts                  # Route events to handlers
│   │   ├── strategy-router.ts               # Route signals to strategies
│   │   └── output-router.ts                 # Route outputs to sinks
│   │
│   ├── queues/
│   │   ├── index.ts                         # Queue exports
│   │   ├── task-queue.ts                    # Generic in-process queue
│   │   ├── event-queue.ts                   # Event buffering queue
│   │   ├── retry-queue.ts                   # Retry scheduling queue
│   │   └── dead-letter-queue.ts             # Failed event storage
│   │
│   ├── jobs/
│   │   ├── index.ts                         # Job exports
│   │   ├── poll-market-data.ts              # Scheduled upstream polling
│   │   ├── refresh-cache.ts                 # Cache refresh jobs
│   │   ├── backfill-history.ts              # Historical signal backfills
│   │   └── flush-metrics.ts                 # Periodic metrics flush
│   │
│   ├── checkpoints/
│   │   ├── index.ts                         # Checkpoint exports
│   │   ├── checkpoint-store.ts              # Persisted progress markers
│   │   ├── stream-offset.ts                 # Event stream offsets
│   │   └── recovery.ts                      # Recovery from saved checkpoints
│   │
│   ├── deduplication/
│   │   ├── index.ts                         # Dedup exports
│   │   ├── event-deduper.ts                 # Duplicate event detection
│   │   ├── signal-deduper.ts                # Duplicate signal detection
│   │   └── fingerprint.ts                   # Event/signal fingerprints
│   │
│   ├── windowing/
│   │   ├── index.ts                         # Time window exports
│   │   ├── tumbling-window.ts               # Fixed windows
│   │   ├── sliding-window.ts                # Rolling windows
│   │   └── session-window.ts                # Session-based windows
│   │
│   ├── anomaly-detection/
│   │   ├── index.ts                         # Anomaly exports
│   │   ├── volume-spike.ts                  # Unusual volume detector
│   │   ├── bridge-anomaly.ts                # Suspicious bridge activity
│   │   ├── tvl-shock.ts                     # Sharp TVL movement detector
│   │   └── sentiment-outlier.ts             # Sentiment anomaly detector
│   │
│   ├── explanations/
│   │   ├── index.ts                         # Explanation exports
│   │   ├── summarizer.ts                    # Human-readable explanation builder
│   │   ├── factor-explainer.ts              # Explain score contributions
│   │   ├── risk-explainer.ts                # Explain risk outcomes
│   │   └── confidence-explainer.ts          # Explain confidence scoring
│   │
│   ├── policies/
│   │   ├── index.ts                         # Policy exports
│   │   ├── policy-engine.ts                 # Rule evaluation engine
│   │   ├── risk-policy.ts                   # Risk gating policy
│   │   ├── confidence-policy.ts             # Confidence threshold policy
│   │   └── emit-policy.ts                   # Output emission policy
│   │
│   ├── permissions/
│   │   ├── index.ts                         # Permission exports
│   │   ├── roles.ts                         # Role definitions
│   │   ├── capabilities.ts                  # Allowed capability sets
│   │   └── access-control.ts                # Permission checks
│   │
│   ├── versioning/
│   │   ├── index.ts                         # Versioning exports
│   │   ├── api-version.ts                   # Public API version helpers
│   │   ├── schema-version.ts                # Schema version tracking
│   │   └── compatibility.ts                 # Backward compatibility rules
│   │
│   ├── migrations/
│   │   ├── index.ts                         # Migration exports
│   │   ├── config-migration.ts              # Config upgrade logic
│   │   ├── schema-migration.ts              # Schema migration logic
│   │   └── cache-migration.ts               # Cache format migrations
│   │
│   ├── retries/
│   │   ├── index.ts                         # Retry exports
│   │   ├── backoff.ts                       # Exponential backoff helpers
│   │   ├── retry-policy.ts                  # Retry rules
│   │   ├── circuit-breaker.ts               # Upstream failure protection
│   │   └── timeout.ts                       # Timeout wrappers
│   │
│   ├── features/
│   │   ├── backtesting/
│   │   │   ├── index.ts                     # Backtesting exports
│   │   │   ├── backtest-runner.ts           # Historical strategy runner
│   │   │   ├── scenario-loader.ts           # Historical scenario loading
│   │   │   └── report.ts                    # Backtesting reports
│   │   ├── simulation/
│   │   │   ├── index.ts                     # Simulation exports
│   │   │   ├── simulator.ts                 # What-if simulation engine
│   │   │   ├── scenario-builder.ts          # Synthetic scenario builder
│   │   │   └── outcomes.ts                  # Simulated outcome modeling
│   │   └── portfolio-impact/
│   │       ├── index.ts                     # Portfolio impact exports
│   │       ├── exposure.ts                  # Exposure mapping
│   │       ├── allocation.ts                # Allocation interpretation
│   │       └── portfolio-risk.ts            # Portfolio-level risk view
│   │
│   └── prediction/
│       ├── keyword-matcher.ts               # Market keyword detection
│       ├── sentiment-analyzer.ts            # Sentiment scoring logic
│       ├── price-predictor.ts               # Price movement prediction
│       ├── volume-analyzer.ts               # Volume-based signal analysis
│       ├── trend-detector.ts                # Trend identification
│       ├── risk-assessor.ts                 # Risk evaluation engine
│       ├── signal-generator.ts              # Unified signal creation
│       ├── ensemble-model.ts                # Multi-model prediction aggregation
│       ├── correlation-analyzer.ts          # Cross-asset correlation analysis
│       ├── liquidity-analyzer.ts            # Liquidity-aware prediction logic
│       ├── volatility-estimator.ts          # Volatility estimation
│       ├── market-regime-detector.ts        # Market regime classification
│       ├── confidence-engine.ts             # Confidence computation engine
│       └── outcome-classifier.ts            # Bullish/bearish/neutral classifier
│
├── skills/
│   └── market-prediction/
│       ├── SKILL.md                         # Skill documentation
│       ├── index.ts                         # Skill bootstrap
│       ├── config.ts                        # Skill-specific configuration
│       ├── handlers.ts                      # Runtime handlers
│       ├── validators.ts                    # Skill validation rules
│       ├── types.ts                         # Skill interfaces
│       ├── prompts/
│       │   ├── system.md                    # System prompt templates
│       │   ├── prediction.md                # Prediction prompt templates
│       │   └── risk.md                      # Risk explanation prompts
│       ├── tools/
│       │   ├── data-tools.ts                # Skill-specific tool bindings
│       │   ├── chain-tools.ts               # Chain interaction tools
│       │   └── metrics-tools.ts             # Metrics-related tools
│       ├── examples/
│       │   ├── basic-skill.ts               # Basic skill example
│       │   └── advanced-skill.ts            # Advanced skill example
│       └── presets/
│           ├── conservative.ts              # Conservative prediction preset
│           ├── balanced.ts                  # Balanced prediction preset
│           └── aggressive.ts               # Aggressive prediction preset
│
├── examples/
│   ├── basic-prediction/
│   │   ├── index.ts                         # Minimal prediction example
│   │   └── README.md                        # Example usage guide
│   ├── multi-chain-monitor/
│   │   ├── index.ts                         # Multi-chain monitoring example
│   │   └── README.md                        # Setup and usage
│   ├── keyword-trigger-bot/
│   │   ├── index.ts                         # Keyword trigger bot example
│   │   └── README.md                        # Bot usage guide
│   ├── plugin-strategy/
│   │   ├── index.ts                         # Custom plugin strategy example
│   │   └── README.md                        # Plugin walkthrough
│   └── replay-debugger/
│       ├── index.ts                         # Replay/debug workflow example
│       └── README.md                        # Replay example docs
│
├── docs/
│   ├── architecture.md                      # High-level architecture overview
│   ├── getting-started.md                   # Installation and quick start
│   ├── configuration.md                     # Config reference
│   ├── providers.md                         # Provider integration guide
│   ├── triggers.md                          # Trigger system guide
│   ├── strategies.md                        # Strategy authoring guide
│   ├── plugins.md                           # Plugin development guide
│   ├── replay.md                            # Replay and auditing guide
│   ├── backtesting.md                       # Backtesting guide
│   ├── telemetry.md                         # Metrics and tracing guide
│   ├── security.md                          # Secrets and permissions guide
│   ├── versioning.md                        # Versioning and compatibility guide
│   └── migration-v2.md                      # Migration notes for v2
│
├── templates/
│   ├── starter-basic/                       # Starter template for simple SDK usage
│   ├── starter-agent/                       # Starter template for AI agents
│   ├── starter-plugin/                      # Starter template for plugin authors
│   └── starter-backtest/                    # Starter template for backtesting
│
├── scripts/
│   ├── build.ts                             # Build helpers
│   ├── release.ts                           # Release automation
│   ├── sync-chains.ts                       # Sync supported chain metadata
│   ├── generate-schemas.ts                  # Generate/validate schemas
│   ├── replay-fixture.ts                    # Replay fixture runner
│   └── benchmark.ts                         # Benchmark runner
│
├── benchmarks/
│   ├── latency.bench.ts                     # Prediction latency benchmark
│   ├── throughput.bench.ts                  # Event throughput benchmark
│   ├── cache-hit-rate.bench.ts              # Cache efficiency benchmark
│   └── aggregation.bench.ts                 # Ensemble aggregation benchmark
│
├── tests/
│   ├── predictor.test.ts                    # Predictor unit tests
│   ├── integration.test.1.ts
│   ├── integration.test.2.ts
│   ├── unit/
│   │   ├── triggers/
│   │   │   ├── keyword-trigger.test.ts      # Keyword trigger unit tests
│   │   │   └── event-trigger.test.ts        # Event trigger unit tests
│   │   ├── scoring/
│   │   │   ├── confidence-scorer.test.ts    # Confidence scoring tests
│   │   │   └── factor-weighter.test.ts      # Factor weighting tests
│   │   └── providers/
│   │       ├── llamafi.test.ts              # LLamaFi adapter tests
│   │       └── mcp.test.ts                  # MCP adapter tests
│   ├── integration/
│   │   ├── multi-chain-flow.test.ts         # Multi-chain integration test
│   │   ├── replay-flow.test.ts              # Replay integration test
│   │   ├── plugin-flow.test.ts              # Plugin lifecycle integration test
│   │   └── backtest-flow.test.ts            # Backtest integration test
│   ├── contracts/
│   │   ├── output.contract.test.ts          # Public output contract tests
│   │   ├── event.contract.test.ts           # Event schema contract tests
│   │   └── plugin.contract.test.ts          # Plugin API contract tests
│   ├── fixtures/
│   │   ├── events/
│   │   │   ├── launch.json                  # Protocol launch event fixture
│   │   │   ├── bridge-flow.json             # Bridge activity fixture
│   │   │   └── tvl-shock.json               # TVL change fixture
│   │   ├── providers/
│   │   │   ├── llamafi-response.json        # LLamaFi fixture payload
│   │   │   └── mcp-response.json            # MCP fixture payload
│   │   └── predictions/
│   │       ├── bullish.json                 # Bullish output fixture
│   │       └── bearish.json                 # Bearish output fixture
│   ├── helpers/
│   │   ├── mock-provider.ts                 # Mock provider for deterministic tests
│   │   ├── mock-events.ts                   # Mock event builders
│   │   └── test-config.ts                   # Shared test config
│   └── ...                                  # 30+ integration tests
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                           # CI pipeline
│   │   ├── release.yml                      # Release workflow
│   │   └── benchmarks.yml                   # Benchmark workflow
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md                    # Bug report template
│   │   ├── feature_request.md               # Feature request template
│   │   └── provider_request.md              # New provider request template
│   └── pull_request_template.md             # PR checklist
│
├── .changeset/
│   └── README.md                            # Changeset config/docs
│
├── package.json                             # Package manifest
├── tsconfig.json                            # TypeScript configuration
├── tsup.config.ts                           # Build configuration
├── vitest.config.ts                         # Test runner config
├── eslint.config.js                         # Linting config
├── .env.example                             # Example environment variables
├── .gitignore                               # Ignore rules
├── LICENSE                                  # Open-source license
├── CONTRIBUTING.md                          # Contributor guide
├── CHANGELOG.md                             # Release history
└── README.md                                # Project overview
```

## Prediction Flow

1. **Ingest data** from supported off-chain providers, chain sources, and event streams.
2. **Normalize inputs** into a consistent internal signal format.
3. **Detect triggers** using keywords, events, thresholds, and composite conditions.
4. **Route signals** through prediction strategies, analyzers, and scoring modules.
5. **Aggregate outputs** through ensemble logic and confidence weighting.
6. **Assess risk** before finalizing the prediction result.
7. **Apply policies** to decide whether the result should be emitted, delayed, blocked, or flagged.
8. **Cache, store, and record metrics** for monitoring, replay, and optimization.

## System Design

The SDK is structured as a layered prediction framework rather than a single prediction engine. Core prediction logic is separated from providers, triggers, chains, scoring, replay, audit, plugins, storage, and testing so each part can evolve independently.

This design makes the SDK easier to extend and safer to run in production. New providers, chains, strategies, or trigger types can be added without rewriting the full orchestration layer, while telemetry, schemas, policies, and contract tests help keep behavior stable as the system grows.

## Main Components

### Core Engine
The core engine is responsible for orchestrating prediction workflows from input to output. It coordinates pipeline stages, scoring systems, prediction modules, and aggregation logic to produce a normalized result.

### Providers and Chains
Provider modules handle external APIs, market feeds, MCP integrations, and on-chain data access. Chain modules define supported networks, RPC behavior, explorers, and network-specific configuration so the SDK can operate consistently across multiple EVM environments.

### Triggers and Routing
Trigger modules decide when prediction logic should run. These may be based on keywords, protocol events, metric thresholds, sentiment changes, or combined rule sets. Routing layers then direct those signals to the correct strategies, models, and output handlers.

### Prediction and Scoring
Prediction modules analyze sentiment, trend, price direction, liquidity, volatility, volume, and broader market context. Scoring layers assign confidence, measure factor contribution, and calibrate output quality before the final ensemble result is returned.

### Risk, Policies, and Explanations
Risk assessment modules evaluate uncertainty, volatility exposure, and decision quality. Policy engines define whether a prediction should pass, be delayed, or be blocked under certain conditions. Explanation modules convert model factors into readable outputs for agents, dashboards, and downstream systems.

### Runtime and Extensibility
The SDK includes hooks, registries, plugins, and a plugin runtime so external developers can add custom providers, strategies, triggers, or analyzers. This makes the system suitable for both internal tooling and third-party extension.

### Replay, Audit, and Observability
Replay modules make it possible to rerun historical event streams and inspect system behavior over time. Audit logs track decisions, factor contributions, and execution paths. Metrics and telemetry provide visibility into latency, quality, throughput, and operational health.

### Storage and Reliability
Storage adapters support caching, metric persistence, checkpoints, and recovery flows. Reliability modules such as retries, timeouts, deduplication, and queue handling help the SDK deal with unstable upstream providers and high-frequency event processing.

## Example Use Cases

- AI trading agents reacting to new launches, liquidity movements, and bridge inflows.
- Market monitoring systems generating predictive alerts from real-time chain activity.
- Research agents that turn on-chain events and market keywords into directional forecasts.
- Multi-chain analytics platforms that need a unified prediction and risk framework.
- Plugin-based prediction products that support custom strategies and provider adapters.
- Backtesting and replay systems for validating prediction quality against historical data.
- **Prediction market arb scanners** that detect Polymarket vs Kalshi vs predict.fun price gaps.
- **News-driven trading bots** that map breaking headlines to live prediction market mispricings.
- **DeFi yield signal systems** that use TVL momentum and funding rate data as prediction inputs.
- **NFT sentiment trackers** that correlate collection floor movements with prediction market prices.
- **Whale activity monitors** that cross-reference large on-chain moves with prediction market positions.

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
  enableTelemetry: true,
});

const result = await predictor.predict({
  keyword: 'bridge inflow',
  token: 'WBNB',
  context: {
    chain: 'bsc',
    timeframe: '1h',
  },
});

console.log(result);
```

## Example Response Shape

```ts
{
  signal: 'bullish',
  confidence: 0.78,
  riskScore: 0.34,
  factors: [
    'positive bridge activity',
    'rising volume trend',
    'keyword trigger matched'
  ],
  explanations: [
    'Bridge inflows increased over the selected timeframe',
    'Volume expansion supports upward momentum'
  ],
  metadata: {
    chain: 'bsc',
    sourceCount: 3,
    cached: false,
    strategy: 'event-driven',
    triggeredBy: 'keyword'
  }
}
```

## Configuration

Typical runtime configuration may include:

- Supported chains and RPC, MCP, or provider endpoints.
- API credentials for market, sentiment, and on-chain data sources.
- Trigger sensitivity for events, keywords, and thresholds.
- Cache TTL, storage adapters, and checkpoint settings.
- Metric and telemetry sinks for dashboards and tracing.
- Risk thresholds and policy rules for downstream automation.
- Plugin registration and custom strategy loading.
- Replay, backtesting, and audit configuration.

## Testing

The SDK is designed for both unit-level confidence and end-to-end reliability. In addition to core prediction tests, the project can include integration tests, contract tests, fixtures, provider mocks, replay scenarios, plugin lifecycle tests, and benchmark suites.

This testing model is important for prediction systems that depend on many moving inputs. As the SDK grows across chains, providers, and strategies, deterministic fixtures and contract coverage help keep prediction behavior stable and debuggable.

## Design Principles

- **Modular by default:** each domain of the SDK can evolve independently.
- **Event-aware:** prediction logic reacts to changing market conditions in real time.
- **Chain-agnostic:** built to support broad multi-chain expansion.
- **Extensible:** providers, strategies, triggers, and plugins can be added without rewriting the core engine.
- **Observable:** metrics, telemetry, and audit trails are first-class features.
- **Replayable:** workflows can be inspected, rerun, and validated over historical inputs.
- **Production-oriented:** caching, validation, retries, checkpoints, and policies are built into the design.

## Provider Adapters (v2.x)

The SDK ships with built-in adapters for all major data sources. Community-contributed adapters can be registered via the plugin system.

### Price & Market Data
| Adapter | Source | Key Required |
|---------|--------|-------------|
| `coingecko` | CoinGecko REST API | Optional (`COINGECKO_API_KEY`) |
| `chainlink` | On-chain price feeds (all EVM) | None (RPC only) |
| `binance` | Binance spot + futures market data | Optional (public endpoints free) |
| `okx` | OKX spot, perps, and DEX | `OKX_API_KEY` |
| `hyperliquid` | Hyperliquid mark prices + funding | None (public REST) |

### DeFi & On-Chain
| Adapter | Source | Key Required |
|---------|--------|-------------|
| `defillama` | TVL, yields, stablecoins, DEX volume | None (free public API) |
| `aave` | Supply/borrow rates, health factors | None (read-only, RPC) |
| `uniswap` | Pool prices, tick data, TWAP oracles | None (RPC) |
| `gmx` | Open interest, funding, mark price | None (REST) |
| `etherscan` | EVM on-chain tx, balances, logs | `ETHERSCAN_API_KEY` |
| `birdeye` | Solana + multi-chain token analytics | `BIRDEYE_API_KEY` |
| `helius` | Solana RPC, DAS, webhooks | `HELIUS_API_KEY` |

### Prediction Markets
| Adapter | Source | Key Required |
|---------|--------|-------------|
| `polymarket` | Polymarket CLOB (Polygon/USDC) | `POLYMARKET_API_KEY` |
| `kalshi` | Kalshi REST (US fiat binary markets) | `KALSHI_API_KEY` |
| `predict-fun` | predict.fun CLOB v2 (BNB/USDT) | `PREDICT_API_KEY` |

### NFT & Social
| Adapter | Source | Key Required |
|---------|--------|-------------|
| `opensea` | NFT floor prices, sales, listings | `OPENSEA_API_KEY` |
| `dexscreener` | New pairs, volume surges | None (free public API) |

### Existing (from v2.0)
| Adapter | Source |
|---------|--------|
| `llamafi` | LLamaFi API client |
| `mcp` | BNB Chain MCP server |
| `news-client` | News/social feed client |
| `sentiment-client` | External sentiment APIs |
| `macro-client` | Macro/market data APIs |

---

## New Strategies (v2.x)

Two new prediction strategies added alongside the existing five:

### `orderbook-pressure-strategy`
Reads prediction market orderbook depth (via Polymarket, Kalshi, or predict.fun adapters), computes bid/ask imbalance, and generates a directional pressure signal. High ask depth → bearish pressure; high bid depth → bullish pressure.

### `cross-venue-divergence-strategy`
Aggregates YES prices across all three prediction market venues for the same event, computes spread and standard deviation, and flags high-divergence markets as mispricing opportunities. Returns `arbitrage_opportunity` signal with net spread (after fees).

---

## Prediction Market Quick Start

```typescript
import { WMarketPredictor } from 'wmarket-prediction-sdk';

const predictor = new WMarketPredictor({
  chains: ['bsc', 'ethereum', 'polygon'],
  providers: {
    polymarket: { apiKey: process.env.POLYMARKET_API_KEY },
    kalshi:     { apiKey: process.env.KALSHI_API_KEY, secret: process.env.KALSHI_API_SECRET },
    predictFun: { apiKey: process.env.PREDICT_API_KEY },
    defillama:  {},    // no key required
    chainlink:  { rpcUrl: process.env.ETH_RPC_URL },
  },
  strategies: ['momentum', 'sentiment', 'cross-venue-divergence', 'orderbook-pressure'],
  enableRiskAssessment: true,
  enableMetrics: true,
  enableCache: true,
});

// Score a market keyword signal with full prediction market context
const result = await predictor.predict({
  keyword: 'Fed rate cut November 2024',
  context: { chain: 'ethereum', timeframe: '4h' },
  platformPrices: {
    polymarket: 0.62,
    kalshi:     0.55,
    predictFun: 0.59,
  },
});

console.log(result.signal);        // 'bullish'
console.log(result.confidence);    // 0.74
console.log(result.divergence);    // { spread: 0.07, arbitrage: true, bestBuy: 'kalshi' }
console.log(result.jellyScore);    // 68 (moderate — half position sizing)

// Scan for cross-venue arb opportunities
const arb = await predictor.scanDivergence({
  query: 'BTC ETF',
  minSpread: 0.03,   // 3% minimum after fees
});
// Returns all event markets where venues disagree > 3% net of fees
```

## Roadmap

- Add more provider adapters for non-EVM and cross-domain market data.
- Expand backtesting and historical scenario tooling with prediction market replay.
- Introduce strategy weighting based on historical prediction performance vs market resolution.
- Add webhook and queue-based output delivery.
- Extend policy controls for safer automated execution.
- Add hosted dashboards for metrics, audits, and replay inspection.
- Support community plugins and provider packages.
- **Real-time divergence alerts:** push notifications when cross-venue spread exceeds threshold.
- **Resolution tracking:** automatically close arb legs when a prediction market resolves.
- **Calibration engine:** auto-adjust Jelly Score thresholds based on historical accuracy per market type.

## Repository

GitHub organization: [jelly-chain](https://github.com/jelly-chain)

## License

Open-source license to be defined in the repository.
