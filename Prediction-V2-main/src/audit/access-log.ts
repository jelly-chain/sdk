export interface AccessLogEntry {
  id: string;
  event: string;
  actor?: string;
  resource?: string;
  outcome: 'success' | 'failure' | 'blocked';
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export class AccessLog {
  private entries: AccessLogEntry[] = [];

  log(event: string, outcome: AccessLogEntry['outcome'], actor?: string, metadata?: Record<string, unknown>): void {
    this.entries.push({
      id: `al_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      event,
      actor,
      outcome,
      timestamp: new Date().toISOString(),
      metadata,
    });
  }

  getAll(): AccessLogEntry[] {
    return [...this.entries];
  }

  getByEvent(event: string): AccessLogEntry[] {
    return this.entries.filter((e) => e.event === event);
  }

  getFailures(): AccessLogEntry[] {
    return this.entries.filter((e) => e.outcome === 'failure' || e.outcome === 'blocked');
  }

  clear(): void {
    this.entries = [];
  }
}
