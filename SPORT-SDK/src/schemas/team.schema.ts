import { Team } from '../types.js';

export function isTeam(val: unknown): val is Team {
  if (typeof val !== 'object' || val === null) return false;
  const t = val as Record<string, unknown>;
  return (
    typeof t['id'] === 'string' &&
    typeof t['name'] === 'string' &&
    typeof t['shortName'] === 'string' &&
    typeof t['sport'] === 'string' &&
    typeof t['league'] === 'string'
  );
}

export function sampleTeam(): Team {
  return {
    id: 'team-arsenal',
    name: 'Arsenal',
    shortName: 'ARS',
    sport: 'football',
    league: 'premier-league',
    countryCode: 'ENG',
    city: 'London',
    ranking: 5,
  };
}
