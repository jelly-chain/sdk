export interface ThresholdRule {
  metric: string;
  operator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq';
  value: number;
  label?: string;
}

export class ThresholdTrigger {
  private rules: ThresholdRule[];

  constructor(rules: ThresholdRule[] = []) {
    this.rules = rules;
  }

  evaluate(metrics: Record<string, number>): boolean {
    return this.rules.some((rule) => this.matchesRule(metrics[rule.metric] ?? 0, rule));
  }

  getTriggeredRules(metrics: Record<string, number>): ThresholdRule[] {
    return this.rules.filter((rule) => this.matchesRule(metrics[rule.metric] ?? 0, rule));
  }

  private matchesRule(actual: number, rule: ThresholdRule): boolean {
    switch (rule.operator) {
      case 'gt': return actual > rule.value;
      case 'lt': return actual < rule.value;
      case 'gte': return actual >= rule.value;
      case 'lte': return actual <= rule.value;
      case 'eq': return actual === rule.value;
    }
  }

  addRule(rule: ThresholdRule): void {
    this.rules.push(rule);
  }
}
