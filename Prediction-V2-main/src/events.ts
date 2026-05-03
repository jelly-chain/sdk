import type { EventPayload, ChainId } from './types.js';

export type EventHandler = (payload: EventPayload) => void | Promise<void>;

export class EventBus {
  private handlers: Map<string, Set<EventHandler>> = new Map();

  subscribe(eventType: string, handler: EventHandler): () => void {
    if (!this.handlers.has(eventType)) this.handlers.set(eventType, new Set());
    this.handlers.get(eventType)!.add(handler);
    return () => this.handlers.get(eventType)?.delete(handler);
  }

  async publish(eventType: string, payload: EventPayload): Promise<void> {
    const handlers = this.handlers.get(eventType) ?? new Set();
    const wildcards = this.handlers.get('*') ?? new Set();
    const all = [...handlers, ...wildcards];
    await Promise.all(all.map((h) => h(payload)));
  }

  listSubscriptions(): string[] {
    return [...this.handlers.keys()];
  }

  clear(): void {
    this.handlers.clear();
  }
}

export const EVENT_TYPES = {
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
} as const;

export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];

export function createEventPayload(
  type: string,
  chain: ChainId,
  data: Record<string, unknown>,
  source: string,
): EventPayload {
  return {
    id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    type,
    chain,
    data,
    timestamp: new Date().toISOString(),
    source,
  };
}
