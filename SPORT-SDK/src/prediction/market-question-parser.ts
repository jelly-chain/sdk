import { Sport, League, SportMarketType } from '../types.js';

export interface ParsedMarketQuestion {
  original: string;
  sport: Sport;
  league: League;
  marketType: SportMarketType;
  extractedTeams: string[];
  extractedPlayers: string[];
  extractedSeason?: string;
  confidence: number;
}

const SPORT_KEYWORDS: Record<string, Sport> = {
  'football': 'football', 'soccer': 'football', 'premier league': 'football',
  'la liga': 'football', 'bundesliga': 'football', 'serie a': 'football',
  'nba': 'basketball', 'basketball': 'basketball',
  'nfl': 'american-football', 'super bowl': 'american-football',
  'tennis': 'tennis', 'wimbledon': 'tennis', 'us open': 'tennis',
  'mlb': 'baseball', 'world series': 'baseball',
  'nhl': 'ice-hockey', 'hockey': 'ice-hockey',
  'ufc': 'mma', 'mma': 'mma',
  'f1': 'formula1', 'formula 1': 'formula1', 'grand prix': 'formula1',
};

const MARKET_KEYWORDS: Record<string, SportMarketType> = {
  'champion': 'CHAMPIONSHIP_WINNER', 'championship': 'CHAMPIONSHIP_WINNER',
  'top scorer': 'TOP_SCORER', 'golden boot': 'TOP_SCORER',
  'title': 'LEAGUE_WINNER', 'league winner': 'LEAGUE_WINNER',
  'series': 'SERIES_WINNER', 'playoffs': 'SERIES_WINNER',
  'over': 'OVER_UNDER', 'under': 'OVER_UNDER',
  'spread': 'SPREAD', 'handicap': 'SPREAD',
  'mvp': 'MVP',
  'qualify': 'QUALIFICATION', 'advance': 'QUALIFICATION',
  'relegate': 'RELEGATION', 'relegated': 'RELEGATION',
  'win': 'MATCH_WINNER', 'beat': 'MATCH_WINNER', 'winner': 'MATCH_WINNER',
};

const LEAGUE_KEYWORDS: Record<string, League> = {
  'premier league': 'premier-league', 'epl': 'premier-league',
  'la liga': 'la-liga', 'bundesliga': 'bundesliga', 'serie a': 'serie-a',
  'ligue 1': 'ligue-1', 'champions league': 'champions-league',
  'nba': 'nba', 'nfl': 'nfl', 'mlb': 'mlb', 'nhl': 'nhl',
  'atp': 'atp', 'wta': 'wta', 'wimbledon': 'wimbledon',
  'us open': 'us-open', 'ufc': 'ufc', 'f1': 'f1',
  'world cup': 'fifa-world-cup', 'fifa': 'fifa-world-cup',
};

export class MarketQuestionParser {
  parse(question: string): ParsedMarketQuestion {
    const lower = question.toLowerCase();

    let sport: Sport = 'football';
    for (const [kw, s] of Object.entries(SPORT_KEYWORDS)) {
      if (lower.includes(kw)) { sport = s; break; }
    }

    let league: League = 'premier-league';
    for (const [kw, l] of Object.entries(LEAGUE_KEYWORDS)) {
      if (lower.includes(kw)) { league = l; break; }
    }

    let marketType: SportMarketType = 'MATCH_WINNER';
    for (const [kw, mt] of Object.entries(MARKET_KEYWORDS)) {
      if (lower.includes(kw)) { marketType = mt; break; }
    }

    const teamPattern = /\b([A-Z][a-z]+(?: [A-Z][a-z]+)*)\b/g;
    const extractedTeams = [...question.matchAll(teamPattern)]
      .map((m) => m[1])
      .filter((t) => t !== undefined)
      .filter((t) => t.length > 2 && !['The', 'Will', 'Can', 'Who', 'What'].includes(t));

    const seasonMatch = question.match(/20\d\d(?:\/20\d\d)?/);
    const extractedSeason = seasonMatch?.[0];

    return {
      original: question,
      sport,
      league,
      marketType,
      extractedTeams,
      extractedPlayers: [],
      extractedSeason,
      confidence: extractedTeams.length > 0 ? 0.7 : 0.4,
    };
  }
}
