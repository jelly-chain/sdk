import { Standing, League } from '../types.js';

export interface RawStanding {
  teamId: string | number;
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

export class StandingNormalizer {
  normalize(raw: RawStanding, providerPrefix: string, league: League, season: string): Standing {
    return {
      teamId: `${providerPrefix}-team-${raw.teamId}`,
      league,
      season,
      position: raw.position,
      played: raw.played,
      won: raw.won,
      drawn: raw.drawn,
      lost: raw.lost,
      pointsFor: raw.pointsFor,
      pointsAgainst: raw.pointsAgainst,
      points: raw.points,
      form: raw.form,
    };
  }

  sort(standings: Standing[]): Standing[] {
    return [...standings].sort((a, b) => a.position - b.position);
  }
}
