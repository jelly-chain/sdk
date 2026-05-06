import { Team, Fixture, Standing } from '../../types.js';
import { SmTeam, SmFixture, SmStanding } from './types.js';

export class SportmonksAdapter {
  toTeam(raw: SmTeam): Team {
    return {
      id: `sm-team-${raw.id}`,
      name: raw.name,
      shortName: raw.short_code ?? raw.name.slice(0, 3).toUpperCase(),
      sport: 'football',
      league: 'premier-league',
    };
  }

  toFixture(raw: SmFixture): Fixture {
    const home = raw.participants.find((p) => p.meta.location === 'home');
    const away = raw.participants.find((p) => p.meta.location === 'away');

    const ftScore = raw.scores.filter((s) => s.description === 'CURRENT');
    const homeScore = ftScore.find((s) => s.score.participant === 'home')?.score.goals;
    const awayScore = ftScore.find((s) => s.score.participant === 'away')?.score.goals;

    return {
      id: `sm-fixture-${raw.id}`,
      sport: 'football',
      league: 'premier-league',
      season: '2025/2026',
      stage: raw.leg ?? 'regular',
      homeTeamId: home ? `sm-team-${home.id}` : 'unknown',
      awayTeamId: away ? `sm-team-${away.id}` : 'unknown',
      kickoffUtc: raw.starting_at,
      status: raw.result_info ? 'finished' : raw.state_id === 5 ? 'live' : 'scheduled',
      homeScore,
      awayScore,
    };
  }

  toStanding(raw: SmStanding, league: string, season: string): Standing {
    return {
      teamId: `sm-team-${raw.participant_id}`,
      league,
      season,
      position: raw.position,
      played: raw.games_played,
      won: raw.won,
      drawn: raw.draw,
      lost: raw.lost,
      pointsFor: raw.goals_scored,
      pointsAgainst: raw.goals_against,
      points: raw.points,
    };
  }
}
