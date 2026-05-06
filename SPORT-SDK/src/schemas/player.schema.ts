import { Player } from '../types.js';

export function isPlayer(val: unknown): val is Player {
  if (typeof val !== 'object' || val === null) return false;
  const p = val as Record<string, unknown>;
  return (
    typeof p['id'] === 'string' &&
    typeof p['name'] === 'string' &&
    typeof p['teamId'] === 'string' &&
    typeof p['sport'] === 'string' &&
    typeof p['available'] === 'boolean'
  );
}

export function samplePlayer(): Player {
  return {
    id: 'player-saka',
    name: 'Bukayo Saka',
    teamId: 'team-arsenal',
    sport: 'football',
    position: 'FWD',
    age: 23,
    available: true,
  };
}
