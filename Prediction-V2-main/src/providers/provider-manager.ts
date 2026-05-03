import type { BaseProvider } from './base-provider.js';
import type { ChainId } from '../types.js';
import { Logger } from '../logger.js';

export class ProviderManager {
  private providers: Map<string, BaseProvider> = new Map();
  private logger = new Logger({ prefix: 'ProviderManager' });

  register(provider: BaseProvider): void {
    this.providers.set(provider.name, provider);
    this.logger.info(`Registered provider: ${provider.name}`);
  }

  unregister(name: string): void {
    this.providers.delete(name);
  }

  get(name: string): BaseProvider | undefined {
    return this.providers.get(name);
  }

  getForChain(chain: ChainId): BaseProvider[] {
    return [...this.providers.values()].filter((p) => p.isChainSupported(chain));
  }

  listAll(): string[] {
    return [...this.providers.keys()];
  }

  async healthCheckAll(): Promise<Record<string, unknown>> {
    const results: Record<string, unknown> = {};
    for (const [name, provider] of this.providers) {
      try {
        results[name] = await provider.healthCheck();
      } catch (err) {
        results[name] = { healthy: false, error: String(err) };
      }
    }
    return results;
  }
}
