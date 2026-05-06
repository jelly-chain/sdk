import { SportMarketType, League } from '../types.js';
import type { SportsNamespace } from '../sdk.js';

export interface ResolutionCriteria {
  marketType: SportMarketType;
  league: League;
  description: string;
  resolutionCondition: string;
  typicalTimeline: string;
}

export class ResolutionMapper {
  constructor(private readonly sports: SportsNamespace) {}

  map(marketType: SportMarketType, league: League): ResolutionCriteria {
    const descriptions: Record<SportMarketType, { description: string; condition: string; timeline: string }> = {
      MATCH_WINNER: { description: 'Winning team after full time (and extra time/penalties if applicable)', condition: 'team with more points/goals at end of regulation or overtime', timeline: 'End of match' },
      SERIES_WINNER: { description: 'Team winning the playoff series', condition: 'First to win required games', timeline: 'End of series' },
      LEAGUE_WINNER: { description: 'League champion at end of regular season or final', condition: 'Team at top of final standings', timeline: 'End of season' },
      DIVISION_WINNER: { description: 'Division champion', condition: 'Team leading division at end of regular season', timeline: 'End of regular season' },
      CONFERENCE_WINNER: { description: 'Conference champion', condition: 'Team winning conference final', timeline: 'End of playoffs' },
      CHAMPIONSHIP_WINNER: { description: 'Overall championship winner', condition: 'Team winning the final', timeline: 'Championship day' },
      PLAYER_PROP: { description: 'Player statistical outcome', condition: 'Stated stat threshold met/exceeded', timeline: 'End of match/event' },
      TEAM_TOTAL: { description: 'Team total points/goals', condition: 'Over or under stated threshold', timeline: 'End of match' },
      OVER_UNDER: { description: 'Combined score over/under', condition: 'Total score vs stated line', timeline: 'End of match' },
      SPREAD: { description: 'Point spread / handicap', condition: 'Margin of victory vs spread', timeline: 'End of match' },
      MONEYLINE: { description: 'Outright winner (moneyline)', condition: 'Team or player wins', timeline: 'End of match' },
      FIRST_GOAL_SCORER: { description: 'Player to score first goal', condition: 'First scorer of the match', timeline: 'During match' },
      BOTH_TEAMS_TO_SCORE: { description: 'Both teams score', condition: 'Both sides score ≥1 goal', timeline: 'End of match' },
      CORRECT_SCORE: { description: 'Exact final score', condition: 'Exact score match', timeline: 'End of match' },
      TOP_SCORER: { description: 'Top scorer of competition', condition: 'Most goals/points in tournament', timeline: 'End of tournament' },
      MVP: { description: 'Most Valuable Player award', condition: 'Official MVP announcement', timeline: 'Post-season' },
      QUALIFICATION: { description: 'Qualifying for next stage/competition', condition: 'Meets qualification criteria', timeline: 'End of qualifying stage' },
      RELEGATION: { description: 'Relegated to lower division', condition: 'Finishes in relegation zone', timeline: 'End of season' },
    };

    const info = descriptions[marketType];

    return {
      marketType,
      league,
      description: info.description,
      resolutionCondition: info.condition,
      typicalTimeline: info.timeline,
    };
  }
}
