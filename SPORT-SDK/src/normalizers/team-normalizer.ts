import { Team, Sport, League } from '../types.js';

export interface RawTeam {
  id: string | number;
  name: string;
  shortName?: string;
  sport: string;
  league?: string;
  country?: string;
  city?: string;
  ranking?: number;
}

export class TeamNormalizer {
  normalize(raw: RawTeam, providerPrefix: string): Team {
    return {
      id: `${providerPrefix}-team-${raw.id}`,
      name: raw.name,
      shortName: raw.shortName ?? this.buildShortName(raw.name),
      sport: raw.sport as Sport,
      league: (raw.league ?? 'unknown') as League,
      countryCode: raw.country,
      city: raw.city,
      ranking: raw.ranking,
    };
  }

  buildId(name: string): string {
    return `team-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
  }

  private buildShortName(name: string): string {
    const words = name.split(' ').filter((w) => w.length > 0);
    if (words.length === 1) return name.slice(0, 3).toUpperCase();
    return words.map((w) => w[0]).join('').slice(0, 3).toUpperCase();
  }

  fuzzyMatch(query: string, teams: Team[]): Team | undefined {
    const normalized = query.toLowerCase().replace(/[^a-z0-9 ]/g, '');
    return teams.find(
      (t) =>
        t.name.toLowerCase().includes(normalized) ||
        t.shortName.toLowerCase() === normalized ||
        normalized.includes(t.name.toLowerCase()),
    );
  }
}
