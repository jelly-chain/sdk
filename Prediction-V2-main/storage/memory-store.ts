import type { StorageAdapter } from './storage-adapter.js';

interface Entry<T> {
  value: T;
  expiresAt?: number;
}

export class MemoryStore implements StorageAdapter {
  private store = new Map<string, Entry<unknown>>();

  async get<T>(key: string): Promise<T | null> {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.value as T;
  }

  async set<T>(key: string, value: T, ttlMs?: number): Promise<void> {
    this.store.set(key, { value, expiresAt: ttlMs ? Date.now() + ttlMs : undefined });
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  async has(key: string): Promise<boolean> {
    return (await this.get(key)) !== null;
  }

  async clear(): Promise<void> {
    this.store.clear();
  }

  async keys(prefix?: string): Promise<string[]> {
    const all = [...this.store.keys()];
    return prefix ? all.filter((k) => k.startsWith(prefix)) : all;
  }
}
