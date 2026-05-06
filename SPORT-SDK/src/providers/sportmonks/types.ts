/** Raw Sportmonks API v3 response shapes. */

export interface SmResponse<T> {
  data: T;
  pagination?: { count: number; per_page: number; current_page: number; next_page: string | null };
  subscription?: unknown[];
  rate_limit?: unknown;
  timezone?: string;
}

export interface SmTeam {
  id: number;
  name: string;
  short_code: string | null;
  country_id: number;
  venue_id: number | null;
  founded: number | null;
  type: string;
}

export interface SmFixture {
  id: number;
  name: string;
  starting_at: string;
  result_info: string | null;
  state_id: number;
  leg: string | null;
  double_chance: string | null;
  participants: Array<{
    id: number;
    name: string;
    meta: { location: 'home' | 'away'; winner: boolean | null };
  }>;
  scores: Array<{
    description: string;
    score: { participant: string; goals: number };
  }>;
}

export interface SmStanding {
  position: number;
  participant_id: number;
  points: number;
  games_played: number;
  won: number;
  draw: number;
  lost: number;
  goals_scored: number;
  goals_against: number;
  goal_diff: number;
}
