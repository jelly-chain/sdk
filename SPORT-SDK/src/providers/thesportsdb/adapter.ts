import { Team, Fixture, Player } from '../../types.js';
import { TsdbTeam, TsdbEvent, TsdbPlayer } from './types.js';

export class TheSportsDbAdapter {
  toTeam(raw: TsdbTeam): Team {
    return {
      id: `tsdb-team-${raw.idTeam}`,
      name: raw.strTeam,
      shortName: raw.strTeamShort ?? raw.strTeam.slice(0, 3).toUpperCase(),
      sport: 'football',
      league: raw.strLeague.toLowerCase().replace(/ /g, '-'),
      countryCode: raw.strCountry,
      city: raw.strCity ?? undefined,
      venue: raw.strStadium ?? undefined,
    };
  }

  toFixture(raw: TsdbEvent): Fixture {
    const status = raw.strStatus === 'Match Finished' ? 'finished'
      : raw.intHomeScore !== null ? 'live'
      : 'scheduled';

    return {
      id: `tsdb-event-${raw.idEvent}`,
      sport: 'football',
      league: raw.strLeague.toLowerCase().replace(/ /g, '-'),
      season: raw.dateEvent.slice(0, 4),
      stage: 'regular',
      homeTeamId: `tsdb-team-${raw.idHomeTeam}`,
      awayTeamId: `tsdb-team-${raw.idAwayTeam}`,
      kickoffUtc: `${raw.dateEvent}T${raw.strTime ?? '00:00:00'}Z`,
      status,
      homeScore: raw.intHomeScore ? parseInt(raw.intHomeScore, 10) : undefined,
      awayScore: raw.intAwayScore ? parseInt(raw.intAwayScore, 10) : undefined,
    };
  }

  toPlayer(raw: TsdbPlayer): Player {
    return {
      id: `tsdb-player-${raw.idPlayer}`,
      name: raw.strPlayer,
      teamId: `tsdb-team-${raw.strTeam}`,
      sport: 'football',
      position: raw.strPosition,
      available: raw.strStatus !== 'Injured',
    };
  }
}
