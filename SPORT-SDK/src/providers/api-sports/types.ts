/** Raw API-Sports (api-sports.io) response shapes. */

export interface ApiSportsResponse<T> {
  get: string;
  parameters: Record<string, string>;
  errors: string[];
  results: number;
  response: T[];
}

export interface ApiSportsTeam {
  team: {
    id: number;
    name: string;
    country: string;
    founded: number | null;
    national: boolean;
    logo: string;
  };
  venue?: {
    id: number | null;
    name: string | null;
    city: string | null;
    capacity: number | null;
  };
}

export interface ApiSportsFixture {
  fixture: {
    id: number;
    date: string;
    status: { short: string; long: string };
    venue: { id: number | null; name: string | null; city: string | null };
  };
  league: { id: number; name: string; country: string; season: number | string };
  teams: {
    home: { id: number; name: string; winner: boolean | null };
    away: { id: number; name: string; winner: boolean | null };
  };
  goals: { home: number | null; away: number | null };
  score: {
    halftime: { home: number | null; away: number | null };
    fulltime: { home: number | null; away: number | null };
    extratime: { home: number | null; away: number | null };
    penalty: { home: number | null; away: number | null };
  };
}

export interface ApiSportsStanding {
  rank: number;
  team: { id: number; name: string };
  points: number;
  goalsDiff: number;
  group: string;
  all: { played: number; win: number; draw: number; lose: number; goals: { for: number; against: number } };
  form: string;
}
