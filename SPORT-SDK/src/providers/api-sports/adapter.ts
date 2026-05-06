import { Team, Fixture, Standing } from '../../types.js';
import { ApiSportsTeam, ApiSportsFixture, ApiSportsStanding } from './types.js';

export class ApiSportsAdapter {
  toTeam(raw: ApiSportsTeam): Team {
    return {
      id: `as-team-${raw.team.id}`,
      name: raw.team.name,
      shortName: raw.team.name.slice(0, 3).toUpperCase(),
      sport: 'football',
      league: 'premier-league',
      countryCode: raw.team.country,
      venue: raw.venue?.name ?? undefined,
    };
  }

  toFixture(raw: ApiSportsFixture): Fixture {
    const statusMap: Record<string, 'scheduled' | 'live' | 'finished' | 'postponed'> = {
      NS: 'scheduled', '1H': 'live', HT: 'live', '2H': 'live', FT: 'finished',
      AET: 'finished', PEN: 'finished', PST: 'postponed', CANC: 'postponed',
    };
    const status = statusMap[raw.fixture.status.short] ?? 'scheduled';

    return {
      id: `as-fixture-${raw.fixture.id}`,
      sport: 'football',
      league: raw.league.name.toLowerCase().replace(/ /g, '-') as string,
      season: String(raw.league.season),
      stage: 'regular',
      homeTeamId: `as-team-${raw.teams.home.id}`,
      awayTeamId: `as-team-${raw.teams.away.id}`,
      kickoffUtc: raw.fixture.date,
      status,
      homeScore: raw.goals.home ?? undefined,
      awayScore: raw.goals.away ?? undefined,
    };
  }

  toStanding(raw: ApiSportsStanding, league: string, season: string): Standing {
    return {
      teamId: `as-team-${raw.team.id}`,
      league,
      season,
      position: raw.rank,
      played: raw.all.played,
      won: raw.all.win,
      drawn: raw.all.draw,
      lost: raw.all.lose,
      pointsFor: raw.all.goals.for,
      pointsAgainst: raw.all.goals.against,
      points: raw.points,
      form: raw.form,
    };
  }
}
