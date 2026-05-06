import { AgentSportsContext, MarketPlatform, Sport, League } from '../types.js';
import type { SportsNamespace, IntelligenceNamespace, PredictionNamespace, MarketsNamespace } from '../sdk.js';

export interface AgentRuntimeConfig {
  format?: 'claude-json' | 'raw';
  maxEvidenceItems?: number;
}

export interface SportsContextInput {
  question: string;
  platform: MarketPlatform;
  sport?: Sport;
  league?: League;
}

export interface MatchContextInput {
  fixtureId: string;
  platform?: MarketPlatform;
}

export interface LeagueContextInput {
  league: League;
  season?: string;
  platform?: MarketPlatform;
}

/** High-level agent runtime that wires all SDK modules for multi-sport intelligence. */
export class AgentRuntime {
  constructor(
    private readonly sports: SportsNamespace,
    private readonly intelligence: IntelligenceNamespace,
    private readonly prediction: PredictionNamespace,
    private readonly markets: MarketsNamespace,
    private readonly config: AgentRuntimeConfig = {},
  ) {}

  /** Answer a full natural-language sports prediction question and return structured context. */
  async getSportsContext(input: SportsContextInput): Promise<AgentSportsContext> {
    const { question, platform } = input;
    const parsed = this.prediction.parser.parse(question);

    const [homeId, awayId] = parsed.extractedTeams;

    const features = await this.prediction.features.build({
      marketType: parsed.marketType,
      teamIds: parsed.extractedTeams,
    });

    const confidence = this.prediction.confidence.score(features);
    const explanation = this.prediction.explanation.build(features, confidence, homeId);

    const evidence: AgentSportsContext['evidence'] = {};
    const signals: AgentSportsContext['signals'] = {
      confidence: confidence.score,
      riskFlags: [],
      narrativeTags: [],
    };

    if (homeId) {
      try {
        const injuries = await this.intelligence.injuries.summary(homeId);
        if (injuries.riskFlags.length > 0) {
          signals.riskFlags.push(...injuries.riskFlags);
          evidence.injuries = injuries.keyAbsences;
        }
      } catch { /* no data */ }
    }

    try {
      const standings = await this.sports.standings.byLeague(parsed.league, parsed.extractedSeason);
      if (standings.length > 0) evidence.standings = standings.slice(0, this.config.maxEvidenceItems ?? 10);
    } catch { /* no data */ }

    return {
      question,
      sport: parsed.sport,
      league: parsed.league,
      marketPlatform: platform,
      marketType: parsed.marketType,
      entities: {
        teams: parsed.extractedTeams,
        players: parsed.extractedPlayers,
        season: parsed.extractedSeason,
      },
      evidence,
      signals: { ...signals, favorite: homeId ?? undefined },
      explanation: explanation.summary,
      generatedAt: new Date().toISOString(),
    };
  }

  /** Get structured match context for a specific fixture. */
  async getMatchContext(input: MatchContextInput): Promise<Record<string, unknown>> {
    const { fixtureId, platform = 'POLYMARKET' } = input;
    const fixture = await this.sports.fixtures.byId(fixtureId).catch(() => null);
    if (!fixture) return { error: `Fixture not found: ${fixtureId}` };

    const [matchup, narrative] = await Promise.all([
      this.intelligence.matchup.compare({
        homeTeamId: fixture.homeTeamId,
        awayTeamId: fixture.awayTeamId,
        sport: fixture.sport,
      }),
      this.intelligence.narratives.forMatch(fixtureId),
    ]);

    return { fixture, matchup, narrative, platform, fetchedAt: new Date().toISOString() };
  }

  /** Get league standings and context for Claude. */
  async getLeagueContext(input: LeagueContextInput): Promise<Record<string, unknown>> {
    const { league, season, platform = 'POLYMARKET' } = input;
    const [standings, context] = await Promise.all([
      this.sports.standings.byLeague(league, season),
      this.intelligence.leagueContext.report(league, season),
    ]);
    return { league, standings, context, platform, fetchedAt: new Date().toISOString() };
  }

  /** Build a compact evidence bundle for agent reasoning across multiple teams. */
  async buildEvidenceBundle(input: { teamIds: string[]; fixtureId?: string; sport: Sport }): Promise<Record<string, unknown>> {
    const bundles = await Promise.all(
      input.teamIds.map(async (id) => ({
        teamId: id,
        injuries: await this.intelligence.injuries.summary(id),
        squadStrength: await this.intelligence.squadStrength.evaluate(id),
      })),
    );
    return { teams: bundles, fixtureId: input.fixtureId, generatedAt: new Date().toISOString() };
  }

  /** Build a Claude-compatible tool response. */
  async buildClaudeToolResponse(input: SportsContextInput): Promise<Record<string, unknown>> {
    const context = await this.getSportsContext(input);
    return { tool: 'sports_prediction', version: '0.1.0', result: context };
  }
}
