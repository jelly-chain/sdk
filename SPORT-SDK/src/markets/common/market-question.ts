import { SportMarketType, Sport, League } from '../../types.js';

export interface MarketQuestionTemplate {
  sport: Sport;
  league: League;
  marketType: SportMarketType;
  template: string;
}

export class MarketQuestion {
  buildQuestion(type: SportMarketType, teamA: string, teamB?: string, league?: string): string {
    switch (type) {
      case 'MATCH_WINNER':
        return `Will ${teamA} beat ${teamB ?? 'their opponent'}?`;
      case 'SERIES_WINNER':
        return `Will ${teamA} win the series against ${teamB ?? 'their opponent'}?`;
      case 'LEAGUE_WINNER':
        return `Will ${teamA} win the ${league ?? 'league'} title?`;
      case 'CHAMPIONSHIP_WINNER':
        return `Will ${teamA} win the championship?`;
      case 'QUALIFICATION':
        return `Will ${teamA} qualify for the next stage?`;
      case 'RELEGATION':
        return `Will ${teamA} be relegated?`;
      case 'MVP':
        return `Will ${teamA} win MVP?`;
      case 'TOP_SCORER':
        return `Will ${teamA} be the top scorer?`;
      default:
        return `${teamA} — ${type}`;
    }
  }

  normalize(question: string): string {
    return question.trim().replace(/\s+/g, ' ').toLowerCase();
  }
}
