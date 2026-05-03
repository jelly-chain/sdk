import type { BaseProvider } from '../providers/base-provider.js';

class ProviderRegistry {
  private registry = new Map<string, BaseProvider>();

  register(provider: BaseProvider): void {
    this.registry.set(provider.name, provider);
  }

  get(name: string): BaseProvider | undefined {
    return this.registry.get(name);
  }

  has(name: string): boolean {
    return this.registry.has(name);
  }

  list(): string[] {
    return [...this.registry.keys()];
  }

  unregister(name: string): void {
    this.registry.delete(name);
  }
}

export const providerRegistry = new ProviderRegistry();
