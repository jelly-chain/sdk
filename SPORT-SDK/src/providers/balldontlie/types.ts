/** Raw BallDontLie API v1 response shapes. */

export interface BdlTeam {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

export interface BdlPlayer {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  team: BdlTeam;
  height: string;
  weight: string;
}

export interface BdlGame {
  id: number;
  date: string;
  home_team: BdlTeam;
  home_team_score: number;
  visitor_team: BdlTeam;
  visitor_team_score: number;
  status: string;
  season: number;
  period: number;
  time: string;
  postseason: boolean;
}

export interface BdlPaginatedResponse<T> {
  data: T[];
  meta: {
    total_pages: number;
    current_page: number;
    next_page: number | null;
    per_page: number;
    total_count: number;
  };
}
