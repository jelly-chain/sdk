/** Redis cache stub — multi-process shared cache (not implemented in v0.1). */

export interface RedisCacheOptions {
  url?: string;
  ttlSeconds?: number;
}

export class RedisCache {
  private readonly ttlSeconds: number;
  readonly connected = false;

  constructor(options: RedisCacheOptions = {}) {
    this.ttlSeconds = options.ttlSeconds ?? 120;
    console.warn('[sports-jelly-sdk] RedisCache: stub only in v0.1, falling back to in-process mode');
  }

  async get<T>(_key: string): Promise<T | null> {
    return null;
  }

  async set<T>(_key: string, _value: T, _ttlSeconds?: number): Promise<void> {
    void this.ttlSeconds;
  }

  async delete(_key: string): Promise<void> {}

  async clear(): Promise<void> {}
}
