export const BULLISH_KEYWORDS = [
  'bridge inflow',
  'protocol launch',
  'tvl surge',
  'liquidity added',
  'whale buy',
  'accumulation',
  'bullish breakout',
  'new partnership',
  'mainnet launch',
  'token unlock completed',
  'listing',
  'integration announced',
];

export const BEARISH_KEYWORDS = [
  'bridge outflow',
  'rug pull',
  'tvl drop',
  'liquidity removed',
  'whale sell',
  'distribution',
  'hack',
  'exploit',
  'security incident',
  'token dump',
  'delisting',
  'exit liquidity',
];

export const NEUTRAL_KEYWORDS = [
  'protocol update',
  'governance vote',
  'token migration',
  'rebranding',
  'roadmap update',
  'team change',
];

export const EVENT_KEYWORDS: string[] = [
  'bridge activity',
  'cross-chain',
  'yield change',
  'fee tier',
  'swap volume',
  'pool created',
  'pool removed',
];

export const ALL_DEFAULT_KEYWORDS = [
  ...BULLISH_KEYWORDS,
  ...BEARISH_KEYWORDS,
  ...NEUTRAL_KEYWORDS,
  ...EVENT_KEYWORDS,
];
