import type { BaseProvider, ProviderHealth } from '../../src/providers/base-provider.js';
import type { MarketSignalModel } from '../../src/models/market-signal.js';
import type { EventPayloadModel } from '../../src/models/event-payload.js';
import type { ChainId } from '../../src/types.js';

export class MockProvider extends (class {} as typeof Object) implements BaseProvider {
  readonly name = 'mock-provider';
  readonly supportedChains: ChainId[] = ['bsc', 'ethereum', 'base', 'polygon'];

  constructor(public mockSignals: MarketSignalModel[] = [], public mockEvents: EventPayloadModel[] = []) {
    super();
  }

  async fetchSignals(_token: string, _chain: ChainId): Promise<MarketSignalModel[]> {
    return this.mockSignals;
  }

  async fetchEvents(_chain: ChainId, _eventType: string): Promise<EventPayloadModel[]> {
    return this.mockEvents;
  }

  async healthCheck(): Promise<ProviderHealth> {
    return { healthy: true, latencyMs: 1, lastChecked: new Date().toISOString() };
  }

  isChainSupported(chain: ChainId): boolean {
    return this.supportedChains.includes(chain);
  }
}
