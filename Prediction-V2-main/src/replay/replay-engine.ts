import type { EventPayload } from '../types.js';
import { Logger } from '../logger.js';

export interface ReplayOptions {
  speedMultiplier?: number;
  startFrom?: string;
  stopAt?: string;
}

export class ReplayEngine {
  private logger = new Logger({ prefix: 'ReplayEngine' });

  async replay(
    events: EventPayload[],
    handler: (event: EventPayload) => Promise<void>,
    options: ReplayOptions = {},
  ): Promise<{ processed: number; errors: number; durationMs: number }> {
    const start = Date.now();
    let processed = 0;
    let errors = 0;

    const sorted = [...events].sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    const filtered = sorted.filter((e) => {
      if (options.startFrom && e.timestamp < options.startFrom) return false;
      if (options.stopAt && e.timestamp > options.stopAt) return false;
      return true;
    });

    this.logger.info(`Replaying ${filtered.length} events`);

    for (const event of filtered) {
      try {
        await handler(event);
        processed++;
      } catch (err) {
        errors++;
        this.logger.warn(`Error replaying event ${event.id}`, err);
      }
    }

    return { processed, errors, durationMs: Date.now() - start };
  }
}
