import type { EventPayload } from '../types.js';

export interface EventTriggerRule {
  eventType: string;
  chain?: string;
  minValue?: number;
  maxValue?: number;
  fieldPath?: string;
}

export class EventTrigger {
  private rules: EventTriggerRule[];

  constructor(rules: EventTriggerRule[] = []) {
    this.rules = rules;
  }

  evaluate(event: EventPayload): boolean {
    return this.rules.some((rule) => this.matchesRule(event, rule));
  }

  private matchesRule(event: EventPayload, rule: EventTriggerRule): boolean {
    if (event.type !== rule.eventType) return false;
    if (rule.chain && event.chain !== rule.chain) return false;
    if (rule.fieldPath && rule.minValue !== undefined) {
      const value = this.getFieldValue(event.data, rule.fieldPath);
      if (typeof value === 'number' && value < rule.minValue) return false;
    }
    return true;
  }

  private getFieldValue(data: Record<string, unknown>, path: string): unknown {
    return path.split('.').reduce((obj, key) => (obj as Record<string, unknown>)?.[key], data as unknown);
  }

  addRule(rule: EventTriggerRule): void {
    this.rules.push(rule);
  }
}
