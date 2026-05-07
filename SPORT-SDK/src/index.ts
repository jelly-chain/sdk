/** sports-jelly-sdk — Public entry point */

export { WorldSportsSDK } from './sdk.js';
export type { SportsNamespace, IntelligenceNamespace, PredictionNamespace, MarketsNamespace } from './sdk.js';

export type {
  Sport, League, MarketPlatform, SportMarketType, MatchStatus, MatchStage,
  Team, Player, Venue, Fixture, Standing, BracketNode, MatchEvent, FormRecord,
  AgentSportsContext, WorldSportsSDKConfig,
  BankrollNamespace, LiveNamespace, ResearchNamespace,
} from './types.js';

export {
  SportsSdkError, ProviderError, RateLimitError, AuthError,
  NotFoundError, ParseError, ConfigError,
  isSportsSdkError, toSportsSdkError,
} from './errors.js';

export { MemoryCache } from './cache/memory-cache.js';
export { CacheKeys } from './cache/cache-keys.js';

export { ToolAdapter } from './agents/tool-adapter.js';
export type { ToolName, ToolDefinition, ToolCall, ToolResult } from './agents/tool-adapter.js';
export { AgentRuntime } from './agents/agent-runtime.js';
export { ResponseSchema } from './agents/response-schema.js';
export { ClaudeFormat } from './agents/claude-format.js';
export { PromptContext } from './agents/prompt-context.js';

export { MarketQuestionParser } from './prediction/market-question-parser.js';
export type { ParsedMarketQuestion } from './prediction/market-question-parser.js';
export { ConfidenceEngine } from './prediction/confidence-engine.js';
export type { ConfidenceResult } from './prediction/confidence-engine.js';
export type { PredictionFeatures } from './prediction/feature-builder.js';
export { ProbabilityCalibrator } from './prediction/probability-calibrator.js';
export { ExplanationBuilder } from './prediction/explanation-builder.js';

export { AlertEngine } from './live/alert-engine.js';
export type { AlertEvent, AlertType, OddsSpikeInput, ScoreChangeInput } from './live/alert-engine.js';

export { ResearchSessionManager } from './research/session.js';
export type { ResearchSessionState, EvidenceItem, StartResearchSessionInput } from './research/session.js';

export { BallDontLieClient } from './providers/balldontlie/client.js';
export { ApiSportsClient } from './providers/api-sports/client.js';
export { FootballDataClient } from './providers/football-data/client.js';
export { TheSportsDbClient } from './providers/thesportsdb/client.js';
export { SportmonksClient } from './providers/sportmonks/client.js';
export { TheOddsApiClient } from './providers/the-odds-api/client.js';
export { AbstractProvider } from './providers/base-provider.js';
export type { BaseProvider } from './providers/base-provider.js';
export { ProviderManager } from './providers/provider-manager.js';

export { PolymarketClient } from './markets/polymarket/client.js';
export { PolymarketMapper } from './markets/polymarket/mapper.js';
export { PolymarketReader } from './markets/polymarket/reader.js';
export type { PolymarketSnapshot, PolymarketPriceBand } from './markets/polymarket/reader.js';
export { KalshiClient } from './markets/kalshi/client.js';
export { KalshiMapper } from './markets/kalshi/mapper.js';
export { KalshiReader } from './markets/kalshi/reader.js';
export type { KalshiSnapshot, KalshiPriceBand } from './markets/kalshi/reader.js';
export { NarrativeEngineDeps } from './intelligence/narrative-engine.js';
export { MarketNormalizer } from './normalizers/market-normalizer.js';
export { OddsNormalizer } from './normalizers/odds-normalizer.js';

export { BacktestRunner } from './backtesting/backtest-runner.js';
export { HistoricalLoader } from './backtesting/historical-loader.js';
export { brierScore, logLoss, accuracy, calibrationError } from './backtesting/scoring.js';
export { BacktestReport } from './backtesting/report.js';

export { ReplayEngine } from './replay/replay-engine.js';
export { TimelineBuilder } from './replay/timeline-builder.js';
export { EventReconstructor } from './replay/event-reconstructor.js';

export { buildTeamId, buildPlayerId, buildFixtureId, slugify } from './utils/strings.js';
export { Ids } from './utils/ids.js';
export { clamp, average, weightedAverage, sigmoid, roundTo } from './utils/math.js';
export { withTimeout, retry, sleep, allSettledMap } from './utils/async.js';
export { parseKickoff, restDaysBetween, isMatchLive, isMatchToday } from './utils/dates.js';

export { isFixture, sampleFixture } from './schemas/fixture.schema.js';
export { isTeam, sampleTeam } from './schemas/team.schema.js';
export { isPlayer, samplePlayer } from './schemas/player.schema.js';
export { isStanding, sampleStanding } from './schemas/standing.schema.js';
export { isAgentSportsContext } from './schemas/prediction-context.schema.js';
