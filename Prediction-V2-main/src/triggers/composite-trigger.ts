import { KeywordTrigger } from './keyword-trigger.js';
import { ThresholdTrigger } from './threshold-trigger.js';
import type { EventPayload } from '../types.js';

export interface CompositeTriggerConfig {
  mode: 'AND' | 'OR';
  keywords?: string[];
  thresholds?: Array<{ metric: string; operator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq'; value: number }>;
}

export class CompositeTrigger {
  private mode: 'AND' | 'OR';
  private keywordTrigger?: KeywordTrigger;
  private thresholdTrigger?: ThresholdTrigger;

  constructor(config: CompositeTriggerConfig) {
    this.mode = config.mode;
    if (config.keywords) this.keywordTrigger = new KeywordTrigger(config.keywords);
    if (config.thresholds) this.thresholdTrigger = new ThresholdTrigger(config.thresholds);
  }

  evaluate(input: { text?: string; metrics?: Record<string, number>; event?: EventPayload }): boolean {
    const results: boolean[] = [];
    if (this.keywordTrigger && input.text) {
      results.push(this.keywordTrigger.evaluate(input.text));
    }
    if (this.thresholdTrigger && input.metrics) {
      results.push(this.thresholdTrigger.evaluate(input.metrics));
    }
    if (results.length === 0) return false;
    return this.mode === 'AND' ? results.every(Boolean) : results.some(Boolean);
  }
}
