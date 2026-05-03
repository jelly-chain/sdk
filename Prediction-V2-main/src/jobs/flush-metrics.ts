import type { MetricsCollector } from '../metrics.js';
import { Logger } from '../logger.js';

export class FlushMetricsJob {
  private metrics: MetricsCollector;
  private logger = new Logger({ prefix: 'FlushMetricsJob' });

  constructor(metrics: MetricsCollector) {
    this.metrics = metrics;
  }

  async flush(sink?: (data: Record<string, unknown>) => Promise<void>): Promise<void> {
    const data = this.metrics.exportAll();
    this.logger.debug('Flushing metrics', data);
    if (sink) await sink(data);
    this.metrics.clear();
  }
}
