import { Standing } from '../types.js';

export function isStanding(val: unknown): val is Standing {
  if (typeof val !== 'object' || val === null) return false;
  const s = val as Record<string, unknown>;
  return (
    typeof s['teamId'] === 'string' &&
    typeof s['league'] === 'string' &&
    typeof s['season'] === 'string' &&
    typeof s['position'] === 'number' &&
    typeof s['points'] === 'number'
  );
}

export function sampleStanding(): Standing {
  return {
    teamId: 'team-arsenal',
    league: 'premier-league',
    season: '2025/2026',
    position: 1,
    played: 20,
    won: 14,
    drawn: 4,
    lost: 2,
    pointsFor: 48,
    pointsAgainst: 22,
    points: 46,
    form: 'WWDWL',
  };
}
