/** Raw TheSportsDB v1 (free) and v2 (Patreon) response shapes. */

export interface TsdbTeam {
  idTeam: string;
  strTeam: string;
  strTeamShort: string | null;
  strSport: string;
  strLeague: string;
  strCountry: string;
  strStadium: string | null;
  strCity: string | null;
}

export interface TsdbEvent {
  idEvent: string;
  strEvent: string;
  strSport: string;
  strLeague: string;
  dateEvent: string;
  strTime: string;
  strStatus: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  idHomeTeam: string;
  idAwayTeam: string;
}

export interface TsdbPlayer {
  idPlayer: string;
  strPlayer: string;
  strTeam: string;
  strPosition: string;
  strNationality: string | null;
  dateBorn: string | null;
  strStatus: string | null;
}

export interface TsdbLeague {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strCountry: string;
  intFormedYear: string | null;
}
