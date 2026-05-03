export const EVENT_NAMES = {
  PROTOCOL_LAUNCH: 'protocol_launch',
  TVL_CHANGE: 'tvl_change',
  BRIDGE_ACTIVITY: 'bridge_activity',
  YIELD_CHANGE: 'yield_change',
  PRICE_UPDATE: 'price_update',
  VOLUME_SPIKE: 'volume_spike',
  LIQUIDITY_SHIFT: 'liquidity_shift',
  SENTIMENT_CHANGE: 'sentiment_change',
  PREDICTION_COMPLETE: 'prediction_complete',
  RISK_ALERT: 'risk_alert',
  CHECKPOINT_SAVED: 'checkpoint_saved',
  PLUGIN_LOADED: 'plugin_loaded',
  REPLAY_STARTED: 'replay_started',
  REPLAY_COMPLETE: 'replay_complete',
} as const;

export type EventName = (typeof EVENT_NAMES)[keyof typeof EVENT_NAMES];

export const ROUTING_KEYS = {
  CHAIN_EVENT: 'chain.*',
  MARKET_EVENT: 'market.*',
  SYSTEM_EVENT: 'system.*',
  PREDICTION_EVENT: 'prediction.*',
} as const;
