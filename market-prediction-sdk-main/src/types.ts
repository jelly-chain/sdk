export interface MarketPrediction {
  symbol: string;
  price: number;
  confidence: number;
  predictionType: 'bullish' | 'bearish' | 'neutral';
  timeframe: 'short-term' | 'medium-term' | 'long-term';
  indicators: Indicator[];
  riskLevel: 'low' | 'medium' | 'high';
  timestamp: Date;
}

export interface Indicator {
  name: string;
  value: number;
  signal: 'buy' | 'sell' | 'hold';
  strength: number;
}

export interface PredictionConfig {
  dataSources: string[];
  keywords: string[];
  confidenceThreshold: number;
  riskTolerance: 'low' | 'medium' | 'high';
  predictionTimeframe: 'short-term' | 'medium-term' | 'long-term';
}

export interface MarketData {
  symbol: string;
  price: number;
  volume: number;
  marketCap: number;
  change24h: number;
  timestamp: Date;
}

export interface Event {
  type: 'protocol_launch' | 'tvl_change' | 'bridge_activity' | 'yield_change';
  data: any;
  timestamp: Date;
  chain: string;
}
