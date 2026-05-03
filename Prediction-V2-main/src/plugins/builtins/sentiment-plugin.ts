import { BasePlugin } from '../plugin.js';
import { SentimentNormalizer } from '../../normalizers/sentiment-normalizer.js';

export class SentimentPlugin extends BasePlugin {
  readonly name = 'builtin-sentiment';
  readonly version = '2.0.0';
  readonly description = 'Built-in sentiment analysis plugin using normalized scoring';
  readonly capabilities = ['sentiment'];

  private normalizer = new SentimentNormalizer();

  async start(): Promise<void> {
    console.info('[SentimentPlugin] Started');
  }

  analyze(texts: { score?: number; label?: string; magnitude?: number; source?: string }[]): ReturnType<SentimentNormalizer['average']> {
    return this.normalizer.average(this.normalizer.normalizeMany(texts));
  }
}
