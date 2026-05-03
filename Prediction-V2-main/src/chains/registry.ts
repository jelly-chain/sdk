import type { ChainId } from '../types.js';

export interface ChainDefinition {
  id: ChainId;
  name: string;
  numericId: number;
  nativeCurrency: string;
  explorerUrl: string;
  rpcUrls: string[];
  isTestnet?: boolean;
}

class ChainRegistry {
  private chains: Map<ChainId, ChainDefinition> = new Map();

  register(chain: ChainDefinition): void {
    this.chains.set(chain.id, chain);
  }

  get(id: ChainId): ChainDefinition | undefined {
    return this.chains.get(id);
  }

  getAll(): ChainDefinition[] {
    return [...this.chains.values()];
  }

  isSupported(id: ChainId): boolean {
    return this.chains.has(id);
  }

  getSupportedIds(): ChainId[] {
    return [...this.chains.keys()];
  }
}

export const chainRegistry = new ChainRegistry();
