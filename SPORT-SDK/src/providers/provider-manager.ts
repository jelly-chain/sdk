import { BaseProvider } from './base-provider.js';

export interface ProviderHealth {
  name: string;
  enabled: boolean;
  healthy: boolean;
  checkedAt: string;
}

export class ProviderManager {
  private readonly providers: Map<string, BaseProvider> = new Map();

  register(provider: BaseProvider): void {
    this.providers.set(provider.name, provider);
  }

  get(name: string): BaseProvider | undefined {
    return this.providers.get(name);
  }

  list(): BaseProvider[] {
    return [...this.providers.values()];
  }

  enabled(): BaseProvider[] {
    return this.list().filter((p) => p.enabled);
  }

  async healthCheck(): Promise<ProviderHealth[]> {
    return Promise.all(
      this.list().map(async (p) => ({
        name: p.name,
        enabled: p.enabled,
        healthy: await p.healthCheck().catch(() => false),
        checkedAt: new Date().toISOString(),
      })),
    );
  }
}
