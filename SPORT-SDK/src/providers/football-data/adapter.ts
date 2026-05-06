import { Team, Fixture, Standing } from '../../types.js';
import { FdTeam, FdMatch, FdStanding } from './types.js';

export class FootballDataAdapter {
  toTeam(raw: FdTeam): Team {
    return {
      id: `fd-team-${raw.id}`,
      name: raw.name,
      shortName: raw.shortName || raw.tla,
      sport: 'football',
      league: 'premier-league',
      countryCode: raw.area?.code,
    };
  }

  toFixture(raw: FdMatch): Fixture {
    const statusMap: Record<string, 'scheduled' | 'live' | 'finished' | 'postponed'> = {
      TIMED: 'scheduled', SCHEDULED: 'scheduled', IN_PLAY: 'live',
      PAUSED: 'live', FINISHED: 'finished', POSTPONED: 'postponed', CANCELLED: 'postponed',
    };

    return {
      id: `fd-match-${raw.id}`,
      sport: 'football',
      league: raw.competition.code.toLowerCase(),
      season: String(raw.season.startDate.slice(0, 4)),
      stage: raw.stage?.toLowerCase() ?? 'regular',
      homeTeamId: `fd-team-${raw.homeTeam.id}`,
      awayTeamId: `fd-team-${raw.awayTeam.id}`,
      kickoffUtc: raw.utcDate,
      status: statusMap[raw.status] ?? 'scheduled',
      homeScore: raw.score.fullTime.home ?? undefined,
      awayScore: raw.score.fullTime.away ?? undefined,
    };
  }

  toStanding(raw: FdStanding, league: string, season: string): Standing {
    return {
      teamId: `fd-team-${raw.team.id}`,
      league,
      season,
      position: raw.position,
      played: raw.playedGames,
      won: raw.won,
      drawn: raw.draw,
      lost: raw.lost,
      pointsFor: raw.goalsFor,
      pointsAgainst: raw.goalsAgainst,
      points: raw.points,
      form: raw.form,
    };
  }
}
