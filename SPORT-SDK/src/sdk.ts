import { WorldSportsSDKConfig } from './types.js';
import { SDKConfig } from './config.js';
import { MemoryCache } from './cache/memory-cache.js';

import { FixturesModule } from './sports/fixtures.js';
import { TeamsModule } from './sports/teams.js';
import { LeaguesModule } from './sports/leagues.js';
import { StandingsModule } from './sports/standings.js';
import { PlayersModule } from './sports/players.js';
import { VenuesModule } from './sports/venues.js';
import { BracketModule } from './sports/bracket.js';
import { MatchEventsModule } from './sports/events.js';
import { ResultsModule } from './sports/results.js';
import { HistoryModule } from './sports/history.js';

import { FormEngine } from './intelligence/form-engine.js';
import { MatchupEngine } from './intelligence/matchup-engine.js';
import { InjuryImpact } from './intelligence/injury-impact.js';
import { SquadStrength } from './intelligence/squad-strength.js';
import { SchedulePressure } from './intelligence/schedule-pressure.js';
import { UpsetDetector } from './intelligence/upset-detector.js';
import { NarrativeEngine, NarrativeEngineDeps } from './intelligence/narrative-engine.js';
import { PlayerAvailability } from './intelligence/player-availability.js';
import { LeagueContext } from './intelligence/league-context.js';

import { MarketQuestionParser } from './prediction/market-question-parser.js';
import { FeatureBuilder } from './prediction/feature-builder.js';
import { ResolutionMapper } from './prediction/resolution-mapper.js';
import { ConfidenceEngine } from './prediction/confidence-engine.js';
import { ScenarioGenerator } from './prediction/scenario-generator.js';
import { ProbabilityCalibrator } from './prediction/probability-calibrator.js';
import { ExplanationBuilder } from './prediction/explanation-builder.js';

import { PolymarketClient } from './markets/polymarket/client.js';
import { PolymarketMapper } from './markets/polymarket/mapper.js';
import { KalshiClient } from './markets/kalshi/client.js';
import { KalshiMapper } from './markets/kalshi/mapper.js';
import { MarketCommon } from './markets/common/market-types.js';

import { AgentRuntime } from './agents/agent-runtime.js';
import { ToolAdapter } from './agents/tool-adapter.js';
import { ClaudeFormat } from './agents/claude-format.js';
import { PromptContext } from './agents/prompt-context.js';
import { ResponseSchema } from './agents/response-schema.js';

import { BacktestRunner } from './backtesting/backtest-runner.js';
import { HistoricalLoader } from './backtesting/historical-loader.js';

import { kellyStake, fixedUnitStake, analyzePortfolioRisk } from './bankroll/index.js';
import { AlertEngine } from './live/alert-engine.js';
import { ResearchSessionManager } from './research/session.js';

/** Fully assembled sports namespace — everything about raw sport data. */
export interface SportsNamespace {
  fixtures: FixturesModule;
  teams: TeamsModule;
  leagues: LeaguesModule;
  standings: StandingsModule;
  players: PlayersModule;
  venues: VenuesModule;
  bracket: BracketModule;
  events: MatchEventsModule;
  results: ResultsModule;
  history: HistoryModule;
}

/** Intelligence namespace — derived signals and analysis. */
export interface IntelligenceNamespace {
  form: FormEngine;
  matchup: MatchupEngine;
  injuries: InjuryImpact;
  squadStrength: SquadStrength;
  schedulePressure: SchedulePressure;
  upsets: UpsetDetector;
  narratives: NarrativeEngine;
  availability: PlayerAvailability;
  leagueContext: LeagueContext;
}

/** Prediction namespace — market reasoning and forecasting. */
export interface PredictionNamespace {
  parser: MarketQuestionParser;
  features: FeatureBuilder;
  resolution: ResolutionMapper;
  confidence: ConfidenceEngine;
  scenarios: ScenarioGenerator;
  calibrator: ProbabilityCalibrator;
  explanation: ExplanationBuilder;
}

/** Markets namespace — Polymarket and Kalshi integration. */
export interface MarketsNamespace {
  polymarket: PolymarketClient;
  polymarketMapper: PolymarketMapper;
  kalshi: KalshiClient;
  kalshiMapper: KalshiMapper;
  common: MarketCommon;
}

export interface BankrollNamespace {
  kelly: typeof kellyStake extends (...args: any[]) => any ? { kellyStake: typeof kellyStake } : never;
  fixedUnits: { fixedUnitStake: typeof fixedUnitStake };
  portfolioRisk: { analyzePortfolioRisk: typeof analyzePortfolioRisk };
}

export interface LiveNamespace {
  alertEngine: AlertEngine;
}

export interface ResearchNamespace {
  session: ResearchSessionManager;
}

/** Top-level entry point for sports-jelly-sdk. */
export class WorldSportsSDK {
  public readonly sports: SportsNamespace;
  public readonly intelligence: IntelligenceNamespace;
  public readonly prediction: PredictionNamespace;
  public readonly markets: MarketsNamespace;
  public readonly agents: AgentRuntime;
  public readonly tools: ToolAdapter;
  public readonly backtesting: BacktestRunner;
  public readonly historicalLoader: HistoricalLoader;

  public readonly bankroll: BankrollNamespace;
  public readonly live: LiveNamespace;
  public readonly research: ResearchNamespace;

  /** Utility singletons exposed for advanced usage. */
  public readonly claude: ClaudeFormat;
  public readonly prompts: PromptContext;
  public readonly schema: ResponseSchema;

  private readonly cache: MemoryCache;
  private readonly config: SDKConfig;

  constructor(userConfig: WorldSportsSDKConfig = {}) {
    this.config = new SDKConfig(userConfig);
    const cacheConfig = this.config.get('cache');
    this.cache = new MemoryCache({ ttlSeconds: cacheConfig.ttlSeconds });

    // Sports namespace
    const fixtures = new FixturesModule(this.cache);
    const teams = new TeamsModule(this.cache);
    const leagues = new LeaguesModule(this.cache);
    const standings = new StandingsModule(this.cache);
    const players = new PlayersModule(this.cache);
    const venues = new VenuesModule(this.cache);
    const bracket = new BracketModule(this.cache);
    const events = new MatchEventsModule(this.cache);
    const results = new ResultsModule(this.cache);
    const history = new HistoryModule(this.cache);

    this.sports = { fixtures, teams, leagues, standings, players, venues, bracket, events, results, history };

    // Intelligence namespace
    const form = new FormEngine(this.sports);
    const matchup = new MatchupEngine(this.sports);
    const injuries = new InjuryImpact(this.sports);
    const squadStrength = new SquadStrength(this.sports);
    const schedulePressure = new SchedulePressure(this.sports);
    const upsets = new UpsetDetector(this.sports);
    const availability = new PlayerAvailability(this.sports);
    const leagueContext = new LeagueContext(this.sports);

    const narrativeDeps: NarrativeEngineDeps = { upsets, injuries };
    const narratives = new NarrativeEngine(this.sports, narrativeDeps);
    this.intelligence = {
      form,
      matchup,
      injuries,
      squadStrength,
      schedulePressure,
      upsets,
      narratives,
      availability,
      leagueContext,
    };

    // Prediction namespace
    const parser = new MarketQuestionParser();
    const features = new FeatureBuilder(this.sports, this.intelligence);
    const resolution = new ResolutionMapper(this.sports);
    const confidence = new ConfidenceEngine();
    const scenarios = new ScenarioGenerator(this.sports, this.intelligence);
    const calibrator = new ProbabilityCalibrator();
    const explanation = new ExplanationBuilder();

    this.prediction = { parser, features, resolution, confidence, scenarios, calibrator, explanation };

    // Markets namespace
    const providersConfig = this.config.get('providers');
    const polymarket = new PolymarketClient(providersConfig.polymarket ?? {});
    const kalshi = new KalshiClient(providersConfig.kalshi ?? {});
    this.markets = {
      polymarket,
      polymarketMapper: new PolymarketMapper(),
      kalshi,
      kalshiMapper: new KalshiMapper(),
      common: new MarketCommon(),
    };

    // Agent layer
    const agentConfig = this.config.get('agent');
    this.agents = new AgentRuntime(this.sports, this.intelligence, this.prediction, this.markets, agentConfig);
    this.tools = new ToolAdapter(this.agents);

    // Backtesting
    this.historicalLoader = new HistoricalLoader(this.cache);
    this.backtesting = new BacktestRunner(this.sports, this.prediction);

    // New namespaces
    this.bankroll = {
      kelly: { kellyStake },
      fixedUnits: { fixedUnitStake },
      portfolioRisk: { analyzePortfolioRisk },
    };
    this.live = { alertEngine: new AlertEngine() };
    this.research = { session: new ResearchSessionManager() };

    // Utilities
    this.claude = new ClaudeFormat();
    this.prompts = new PromptContext();
    this.schema = new ResponseSchema();
  }

  /** Return the tool definitions for Claude function calling. */
  getToolDefinitions() {
    return this.tools.getToolDefinitions();
  }
}
