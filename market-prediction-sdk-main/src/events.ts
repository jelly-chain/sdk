export enum EventType {
  PROTOCOL_LAUNCH = 'protocol_launch',
  TVL_CHANGE = 'tvl_change',
  BRIDGE_ACTIVITY = 'bridge_activity',
  YIELD_CHANGE = 'yield_change',
  PRICE_UPDATE = 'price_update',
  VOLUME_SPIKE = 'volume_spike'
}

export interface EventEmitter {
  on(event: EventType, callback: (data: any) => void): void;
  off(event: EventType, callback: (data: any) => void): void;
  emit(event: EventType, data: any): void;
}

export interface EventBus {
  subscribe(channel: string, callback: (data: any) => void): () => void;
  publish(channel: string, data: any): void;
}
