import { AgentSportsContext, Sport, League, SportMarketType, MarketPlatform } from '../types.js';

/** Validates and ensures agent response objects conform to AgentSportsContext. */
export class ResponseSchema {
  validate(obj: unknown): obj is AgentSportsContext {
    if (typeof obj !== 'object' || obj === null) return false;
    const ctx = obj as Record<string, unknown>;
    const entities = ctx['entities'];
    const signals = ctx['signals'];
    const entRec = typeof entities === 'object' && entities !== null ? (entities as Record<string, unknown>) : null;
    const sigRec = typeof signals === 'object' && signals !== null ? (signals as Record<string, unknown>) : null;

    return (
      typeof ctx['question'] === 'string' &&
      typeof ctx['sport'] === 'string' &&
      typeof ctx['league'] === 'string' &&
      typeof ctx['marketPlatform'] === 'string' &&
      typeof ctx['marketType'] === 'string' &&
      entRec !== null && Array.isArray(entRec['teams']) &&
      sigRec !== null && typeof sigRec['confidence'] === 'number' &&
      typeof ctx['explanation'] === 'string' &&
      typeof ctx['generatedAt'] === 'string'
    );
  }

  fallback(question: string, sport: Sport = 'football', league: League = 'premier-league', platform: MarketPlatform = 'POLYMARKET'): AgentSportsContext {
    return {
      question,
      sport,
      league,
      marketPlatform: platform,
      marketType: 'MATCH_WINNER' as SportMarketType,
      entities: { teams: [], season: undefined },
      evidence: {},
      signals: { confidence: 0, riskFlags: ['data-unavailable'], narrativeTags: [] },
      explanation: 'Unable to generate prediction context due to missing data.',
      generatedAt: new Date().toISOString(),
    };
  }
}
