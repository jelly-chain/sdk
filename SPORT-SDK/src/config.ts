/**
 * SDKConfig — applies defaults and validates WorldSportsSDKConfig.
 * IMPORTANT: this file only imports from types.ts and errors.ts
 * to avoid circular imports.
 */
import { WorldSportsSDKConfig, Sport, League } from './types.js';
import { ConfigError } from './errors.js';

type CacheConfig = Required<NonNullable<WorldSportsSDKConfig['cache']>>;
type AgentConfig = Required<NonNullable<WorldSportsSDKConfig['agent']>>;
type ProvidersConfig = NonNullable<WorldSportsSDKConfig['providers']>;

const DEFAULT_CACHE: CacheConfig = {
  type: 'memory',
  ttlSeconds: Number(process.env['CACHE_TTL_SECONDS'] ?? '120'),
  redisUrl: '',
};

const DEFAULT_AGENT: AgentConfig = {
  format: 'claude-json',
  maxEvidenceItems: 10,
};

export class SDKConfig {
  private readonly raw: WorldSportsSDKConfig;

  constructor(config: WorldSportsSDKConfig = {}) {
    this.raw = config;
    this.validate();
  }

  get(key: 'cache'): CacheConfig;
  get(key: 'agent'): AgentConfig;
  get(key: 'providers'): ProvidersConfig;
  get(key: 'defaultSport'): Sport;
  get(key: 'defaultLeague'): League;
  get(key: string): unknown {
    switch (key) {
      case 'cache':
        return { ...DEFAULT_CACHE, ...(this.raw.cache ?? {}) };
      case 'agent':
        return { ...DEFAULT_AGENT, ...(this.raw.agent ?? {}) };
      case 'providers':
        return this.raw.providers ?? {};
      case 'defaultSport':
        return this.raw.defaultSport ?? 'football';
      case 'defaultLeague':
        return this.raw.defaultLeague ?? 'premier-league';
      default:
        throw new ConfigError(`Unknown config key: ${key}`);
    }
  }

  private validate(): void {
    const cache = this.raw.cache;
    if (cache?.ttlSeconds !== undefined && cache.ttlSeconds <= 0) {
      throw new ConfigError('cache.ttlSeconds must be positive');
    }
    if (cache?.type === 'redis' && !cache.redisUrl) {
      throw new ConfigError('cache.redisUrl is required when cache.type is "redis"');
    }
  }
}
