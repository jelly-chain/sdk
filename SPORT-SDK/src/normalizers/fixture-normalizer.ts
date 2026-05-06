import { Fixture, MatchStatus } from '../types.js';

export interface RawFixture {
  id: string | number;
  sport: string;
  league: string;
  season: string | number;
  homeTeamId: string | number;
  awayTeamId: string | number;
  kickoffUtc: string;
  statusRaw: string;
  homeScore?: number | null;
  awayScore?: number | null;
  round?: string;
}

const STATUS_MAP: Record<string, MatchStatus> = {
  scheduled: 'scheduled', ns: 'scheduled', timed: 'scheduled',
  live: 'live', '1h': 'live', '2h': 'live', ht: 'live', inplay: 'live',
  finished: 'finished', ft: 'finished', final: 'finished', aet: 'finished',
  postponed: 'postponed', pst: 'postponed', cancelled: 'postponed', canc: 'postponed',
};

export class FixtureNormalizer {
  normalize(raw: RawFixture): Fixture {
    const status: MatchStatus = STATUS_MAP[raw.statusRaw.toLowerCase()] ?? 'scheduled';

    return {
      id: String(raw.id),
      sport: raw.sport as Fixture['sport'],
      league: raw.league,
      season: String(raw.season),
      stage: 'regular',
      homeTeamId: String(raw.homeTeamId),
      awayTeamId: String(raw.awayTeamId),
      kickoffUtc: raw.kickoffUtc,
      status,
      homeScore: raw.homeScore ?? undefined,
      awayScore: raw.awayScore ?? undefined,
      round: raw.round,
    };
  }

  isCompleted(fixture: Fixture): boolean {
    return fixture.status === 'finished';
  }

  hasResult(fixture: Fixture): boolean {
    return fixture.homeScore !== undefined && fixture.awayScore !== undefined;
  }
}
