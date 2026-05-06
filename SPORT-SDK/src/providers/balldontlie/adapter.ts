import { Team, Player, Fixture } from '../../types.js';
import { BdlTeam, BdlPlayer, BdlGame } from './types.js';

export class BallDontLieAdapter {
  toTeam(raw: BdlTeam): Team {
    return {
      id: `bdl-team-${raw.id}`,
      name: raw.full_name,
      shortName: raw.abbreviation,
      sport: 'basketball',
      league: 'nba',
      city: raw.city,
      conference: raw.conference,
      division: raw.division,
    };
  }

  toPlayer(raw: BdlPlayer): Player {
    return {
      id: `bdl-player-${raw.id}`,
      name: `${raw.first_name} ${raw.last_name}`,
      teamId: `bdl-team-${raw.team.id}`,
      sport: 'basketball',
      position: raw.position || 'Unknown',
      available: true,
    };
  }

  toFixture(raw: BdlGame): Fixture {
    const homeScore = raw.home_team_score;
    const awayScore = raw.visitor_team_score;
    const status = raw.status === 'Final' ? 'finished' : raw.status === '' ? 'scheduled' : 'live';

    return {
      id: `bdl-game-${raw.id}`,
      sport: 'basketball',
      league: 'nba',
      season: String(raw.season),
      stage: raw.postseason ? 'playoff' : 'regular',
      homeTeamId: `bdl-team-${raw.home_team.id}`,
      awayTeamId: `bdl-team-${raw.visitor_team.id}`,
      kickoffUtc: raw.date,
      status,
      homeScore: homeScore || undefined,
      awayScore: awayScore || undefined,
    };
  }
}
