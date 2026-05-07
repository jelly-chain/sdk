/** All shared TypeScript interfaces and type aliases for sports-jelly-sdk. */

// ─── Sport & League ──────────────────────────────────────────────────────────

export type Sport =
  | 'football'
  | 'basketball'
  | 'american-football'
  | 'tennis'
  | 'baseball'
  | 'ice-hockey'
  | 'mma'
  | 'formula1';

export type League =
  | 'premier-league'
  | 'la-liga'
  | 'bundesliga'
  | 'serie-a'
  | 'ligue-1'
  | 'champions-league'
  | 'europa-league'
  | 'mls'
  | 'fifa-world-cup'
  | 'nba'
  | 'wnba'
  | 'ncaab'
  | 'euroleague'
  | 'nfl'
  | 'ncaaf'
  | 'wimbledon'
  | 'us-open'
  | 'australian-open'
  | 'french-open'
  | 'atp'
  | 'wta'
  | 'mlb'
  | 'nhl'
  | 'ufc'
  | 'f1'
  | string;

export type MarketPlatform = 'POLYMARKET' | 'KALSHI';

export type SportMarketType =
  | 'MATCH_WINNER'
  | 'SERIES_WINNER'
  | 'LEAGUE_WINNER'
  | 'DIVISION_WINNER'
  | 'CONFERENCE_WINNER'
  | 'CHAMPIONSHIP_WINNER'
  | 'PLAYER_PROP'
  | 'TEAM_TOTAL'
  | 'OVER_UNDER'
  | 'SPREAD'
  | 'MONEYLINE'
  | 'FIRST_GOAL_SCORER'
  | 'BOTH_TEAMS_TO_SCORE'
  | 'CORRECT_SCORE'
  | 'TOP_SCORER'
  | 'MVP'
  | 'QUALIFICATION'
  | 'RELEGATION';

export type MatchStatus = 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled';
export type MatchStage = 'regular' | 'playoff' | 'final' | 'semifinal' | 'quarterfinal' | 'group' | 'knockout' | string;

// ─── Core entities ───────────────────────────────────────────────────────────

export interface Team {
  id: string;
  name: string;
  shortName: string;
  sport: Sport;
  league: League;
  countryCode?: string;
  city?: string;
  venue?: string;
  ranking?: number;
  conference?: string;
  division?: string;
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  sport: Sport;
  position: string;
  age?: number;
  nationality?: string;
  available: boolean;
  injuryNote?: string;
  stats?: Record<string, number>;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  country: string;
  capacity: number;
  surface?: string;
  latitude?: number;
  longitude?: number;
}

export interface Fixture {
  id: string;
  sport: Sport;
  league: League;
  season: string;
  stage: MatchStage;
  homeTeamId: string;
  awayTeamId: string;
  venueId?: string;
  kickoffUtc: string;
  status: MatchStatus;
  homeScore?: number;
  awayScore?: number;
  overtimeScore?: { home: number; away: number };
  penaltyScore?: { home: number; away: number };
  round?: string;
}

export interface Standing {
  teamId: string;
  league: League;
  season: string;
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  pointsFor: number;
  pointsAgainst: number;
  points: number;
  form?: string;
}

export interface BracketNode {
  round: MatchStage;
  slot: string;
  fixtureId?: string;
  homeTeamId?: string;
  awayTeamId?: string;
  winnerId?: string;
}

export interface MatchEvent {
  id: string;
  fixtureId: string;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'penalty' | 'own_goal' | 'touchdown' | 'basket' | 'wicket' | 'ace' | string;
  minute?: number;
  period?: string;
  teamId: string;
  playerId?: string;
  assistPlayerId?: string;
  detail?: string;
}

export interface FormRecord {
  teamId: string;
  league: League;
  window: number;
  results: Array<'W' | 'D' | 'L'>;
  pointsFor: number;
  pointsAgainst: number;
  formRating: number;
}

// ─── Agent context ───────────────────────────────────────────────────────────

export interface AgentSportsContext {
  question: string;
  sport: Sport;
  league: League;
  marketPlatform: MarketPlatform;
  marketType: SportMarketType;
  entities: {
    teams: string[];
    players?: string[];
    fixtureId?: string;
    season?: string;
  };
  evidence: {
    standings?: Standing[];
    form?: FormRecord[];
    injuries?: string[];
    odds?: Record<string, number>;
    marketData?: Record<string, unknown>;
  };
  signals: {
    favorite?: string;
    confidence: number;
    riskFlags: string[];
    narrativeTags: string[];
  };
  explanation: string;
  generatedAt: string;
}

// ─── Namespaces (SDK wiring) ───────────────────────────────────────────────

import type { AlertEngine } from './live/alert-engine.js';
import type { ResearchSessionManager } from './research/session.js';

export interface BankrollNamespace {
  kelly: unknown;
  fixedUnits: unknown;
  portfolioRisk: unknown;
}

export interface LiveNamespace {
  alertEngine: AlertEngine;
}

export interface ResearchNamespace {
  session: ResearchSessionManager;
}

// ─── SDK config ───────────────────────────────────────────────────────────────

export interface WorldSportsSDKConfig {
  providers?: {
    ballDontLie?: { apiKey?: string; enabled?: boolean };
    apiSports?: { apiKey?: string; enabled?: boolean };
    footballData?: { apiKey?: string; enabled?: boolean };
    theSportsDb?: { apiKey?: string; enabled?: boolean };
    sportmonks?: { apiKey?: string; enabled?: boolean };
    theOddsApi?: { apiKey?: string; enabled?: boolean };
    mySportsFeeds?: { apiKey?: string; enabled?: boolean };
    polymarket?: { enabled?: boolean };
    kalshi?: { enabled?: boolean; keyId?: string; privateKey?: string };
  };
  cache?: {
    type?: 'memory' | 'redis';
    ttlSeconds?: number;
    redisUrl?: string;
  };
  agent?: {
    format?: 'claude-json' | 'raw';
    maxEvidenceItems?: number;
  };
  defaultSport?: Sport;
  defaultLeague?: League;
}
