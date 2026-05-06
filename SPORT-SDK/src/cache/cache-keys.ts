import { Sport, League } from '../types.js';

/** Deterministic cache key builders for all entity types. */
export const CacheKeys = {
  fixture: (id: string) => `fixture:${id}`,
  fixtures: (sport: Sport, league: League, season?: string) =>
    `fixtures:${sport}:${league}:${season ?? 'current'}`,
  team: (id: string) => `team:${id}`,
  teams: (sport: Sport, league?: League) => `teams:${sport}:${league ?? 'all'}`,
  player: (id: string) => `player:${id}`,
  players: (teamId: string) => `players:team:${teamId}`,
  standings: (league: League, season?: string) => `standings:${league}:${season ?? 'current'}`,
  h2h: (teamA: string, teamB: string, sport: Sport) =>
    `h2h:${[teamA, teamB].sort().join(':')}:${sport}`,
  form: (teamId: string, window: number) => `form:${teamId}:${window}`,
  bracket: (league: League) => `bracket:${league}`,
  venues: () => 'venues:all',
  venue: (id: string) => `venue:${id}`,
} as const;
