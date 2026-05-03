import type { PredictionInput } from '../types.js';
import { KeywordTrigger } from './keyword-trigger.js';
import { Logger } from '../logger.js';

export class TriggerEngine {
  private keywordTrigger = new KeywordTrigger();
  private logger = new Logger({ prefix: 'TriggerEngine' });

  async evaluate(input: PredictionInput): Promise<string[]> {
    const triggered: string[] = [];

    if (input.keyword) {
      const matched = this.keywordTrigger.evaluate(input.keyword);
      if (matched) triggered.push(`keyword:${input.keyword}`);
    }

    if (input.triggers) {
      triggered.push(...input.triggers.map((t) => `explicit:${t}`));
    }

    this.logger.debug('Triggers evaluated', { count: triggered.length });
    return triggered;
  }
}
