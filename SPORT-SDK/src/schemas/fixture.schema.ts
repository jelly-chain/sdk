import { Fixture } from '../types.js';

export function isFixture(val: unknown): val is Fixture {
  if (typeof val !== 'object' || val === null) return false;
  const f = val as Record<string, unknown>;
  return (
    typeof f['id'] === 'string' &&
    typeof f['sport'] === 'string' &&
    typeof f['league'] === 'string' &&
    typeof f['homeTeamId'] === 'string' &&
    typeof f['awayTeamId'] === 'string' &&
    typeof f['kickoffUtc'] === 'string' &&
    typeof f['status'] === 'string'
  );
}

export function sampleFixture(): Fixture {
  return {
    id: 'sample-fixture-001',
    sport: 'football',
    league: 'premier-league',
    season: '2025/2026',
    stage: 'regular',
    homeTeamId: 'team-arsenal',
    awayTeamId: 'team-chelsea',
    kickoffUtc: new Date().toISOString(),
    status: 'scheduled',
  };
}
