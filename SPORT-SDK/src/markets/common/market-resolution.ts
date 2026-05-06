import { SportMarketType } from '../../types.js';

export interface ResolutionCondition {
  marketType: SportMarketType;
  description: string;
  isResolved(outcome: unknown): boolean;
}

export function buildResolutionCondition(marketType: SportMarketType): ResolutionCondition {
  return {
    marketType,
    description: getDescription(marketType),
    isResolved(outcome: unknown): boolean {
      if (outcome === null || outcome === undefined) return false;
      if (typeof outcome === 'boolean') return outcome;
      if (typeof outcome === 'string') return outcome.length > 0 && outcome !== 'pending';
      return true;
    },
  };
}

function getDescription(marketType: SportMarketType): string {
  const map: Record<SportMarketType, string> = {
    MATCH_WINNER: 'Resolved when match result is confirmed',
    SERIES_WINNER: 'Resolved when series concludes',
    LEAGUE_WINNER: 'Resolved at end of season',
    DIVISION_WINNER: 'Resolved at end of regular season',
    CONFERENCE_WINNER: 'Resolved at end of conference finals',
    CHAMPIONSHIP_WINNER: 'Resolved after championship game',
    PLAYER_PROP: 'Resolved based on player stat at end of game',
    TEAM_TOTAL: 'Resolved when final score confirmed',
    OVER_UNDER: 'Resolved when final combined score confirmed',
    SPREAD: 'Resolved when final margin confirmed',
    MONEYLINE: 'Resolved when winner confirmed',
    FIRST_GOAL_SCORER: 'Resolved when first goal is scored',
    BOTH_TEAMS_TO_SCORE: 'Resolved at end of match',
    CORRECT_SCORE: 'Resolved at end of match',
    TOP_SCORER: 'Resolved at end of tournament/season',
    MVP: 'Resolved after official MVP announcement',
    QUALIFICATION: 'Resolved when qualification is confirmed',
    RELEGATION: 'Resolved at end of season',
  };
  return map[marketType] ?? 'Resolved based on official result';
}
