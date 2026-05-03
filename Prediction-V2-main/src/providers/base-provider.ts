import type { MarketSignalModel } from '../models/market-signal.js';
import type { EventPayloadModel } from '../models/event-payload.js';
import type { ChainId } from '../types.js';

export interface ProviderHealth {
  healthy: boolean;
  latencyMs: number;
  lastChecked: string;
  errorRate?: number;
}

export abstract class BaseProvider {
  abstract readonly name: string;
  abstract readonly supportedChains: ChainId[];

  abstract fetchSignals(token: string, chain: ChainId): Promise<MarketSignalModel[]>;
  abstract fetchEvents(chain: ChainId, eventType: string): Promise<EventPayloadModel[]>;
  abstract healthCheck(): Promise<ProviderHealth>;

  isChainSupported(chain: ChainId): boolean {
    return this.supportedChains.includes(chain) || this.supportedChains.includes('*' as ChainId);
  }
}
