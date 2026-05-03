import type { ChainId } from '../types.js';

export interface EventPayloadModel {
  id: string;
  type: string;
  chain: ChainId;
  contractAddress?: string;
  blockNumber?: number;
  txHash?: string;
  data: Record<string, unknown>;
  timestamp: string;
  source: string;
  processed: boolean;
}

export function createEventPayloadModel(
  partial: Omit<EventPayloadModel, 'id' | 'timestamp' | 'processed'>,
): EventPayloadModel {
  return {
    id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    processed: false,
    ...partial,
  };
}
