import { Sport, League } from '../types.js';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function normalizeTeamName(name: string): string {
  return name.trim().replace(/\s+/g, ' ').toLowerCase();
}

export function buildTeamId(sport: Sport, name: string): string {
  return `${slugify(sport)}-${slugify(name)}`;
}

export function buildPlayerId(sport: Sport, teamName: string, playerName: string): string {
  return `${slugify(sport)}-${slugify(teamName)}-${slugify(playerName)}`;
}

export function buildFixtureId(league: League, homeTeam: string, awayTeam: string, date: string): string {
  const datePart = date.slice(0, 10).replace(/-/g, '');
  return `${slugify(league)}-${slugify(homeTeam)}-v-${slugify(awayTeam)}-${datePart}`;
}

export function buildLeagueId(sport: Sport, league: League): string {
  return `${slugify(sport)}-${slugify(league)}`;
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

export function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}
