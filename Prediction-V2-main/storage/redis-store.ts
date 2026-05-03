import type { StorageAdapter } from './storage-adapter.js';

export class RedisStore implements StorageAdapter {
  private url: string;

  constructor(url = 'redis://localhost:6379') {
    this.url = url;
  }

  async get<T>(key: string): Promise<T | null> {
    return null;
  }

  async set<T>(_key: string, _value: T, _ttlMs?: number): Promise<void> {
  }

  async delete(_key: string): Promise<void> {
  }

  async has(key: string): Promise<boolean> {
    return (await this.get(key)) !== null;
  }

  async clear(): Promise<void> {
  }

  async keys(_prefix?: string): Promise<string[]> {
    return [];
  }
}
