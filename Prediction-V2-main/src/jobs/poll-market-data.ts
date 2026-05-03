import { Logger } from '../logger.js';

export class PollMarketDataJob {
  private intervalMs: number;
  private logger = new Logger({ prefix: 'PollMarketDataJob' });
  private timer?: ReturnType<typeof setInterval>;

  constructor(intervalMs = 60_000) {
    this.intervalMs = intervalMs;
  }

  start(handler: () => Promise<void>): void {
    this.logger.info(`Starting poll job (interval: ${this.intervalMs}ms)`);
    this.timer = setInterval(async () => {
      try {
        await handler();
      } catch (err) {
        this.logger.error('Poll job error', err);
      }
    }, this.intervalMs);
  }

  stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
      this.logger.info('Poll job stopped');
    }
  }

  isRunning(): boolean {
    return this.timer !== undefined;
  }
}
