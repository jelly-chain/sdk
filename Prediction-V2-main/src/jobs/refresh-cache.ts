import type { CacheManager } from '../cache.js';
import { Logger } from '../logger.js';

export class RefreshCacheJob {
  private cache: CacheManager;
  private logger = new Logger({ prefix: 'RefreshCacheJob' });

  constructor(cache: CacheManager) {
    this.cache = cache;
  }

  async run(): Promise<{ evicted: number }> {
    this.logger.info('Running cache refresh');
    const evicted = this.cache.evictExpired();
    this.logger.info(`Cache refresh complete — evicted ${evicted} entries`);
    return { evicted };
  }
}
