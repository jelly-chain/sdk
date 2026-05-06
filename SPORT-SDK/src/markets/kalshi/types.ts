/** Raw Kalshi REST API types. */

export interface KalshiMarket {
  ticker: string;
  event_ticker: string;
  series_ticker: string;
  title: string;
  subtitle: string;
  status: 'open' | 'closed' | 'settled' | 'finalized';
  result?: string;
  can_close_early: boolean;
  close_time: string;
  yes_bid: number;
  yes_ask: number;
  no_bid: number;
  no_ask: number;
  last_price: number;
  previous_price: number;
  volume: number;
  volume_24h: number;
  open_interest: number;
  category: string;
  tags: string[];
}

export interface KalshiEvent {
  event_ticker: string;
  series_ticker: string;
  title: string;
  mutually_exclusive: boolean;
  category: string;
  markets: KalshiMarket[];
}

export interface KalshiMarketsResponse {
  markets: KalshiMarket[];
  cursor?: string;
}
