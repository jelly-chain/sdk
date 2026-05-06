import { slugify } from './strings.js';

/** Deterministic entity ID builders. */
export const Ids = {
  team: (name: string) => `team-${slugify(name)}`,
  player: (firstName: string, lastName: string) => `player-${slugify(firstName)}-${slugify(lastName)}`,
  fixture: (homeId: string, awayId: string, date: string) =>
    `fixture-${homeId}-vs-${awayId}-${date.slice(0, 10).replace(/-/g, '')}`,
  league: (name: string) => `league-${slugify(name)}`,
  venue: (name: string, city: string) => `venue-${slugify(name)}-${slugify(city)}`,
  season: (startYear: number, sport: string) =>
    sport === 'basketball' || sport === 'ice-hockey' || sport === 'american-football'
      ? String(startYear)
      : `${startYear}/${startYear + 1}`,
} as const;
