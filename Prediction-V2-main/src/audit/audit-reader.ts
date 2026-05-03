import type { AuditLog, AuditEntry } from './audit-log.js';

export class AuditReader {
  private log: AuditLog;

  constructor(log: AuditLog) {
    this.log = log;
  }

  async query(filter: { signal?: string; minConfidence?: number; fromDate?: string; toDate?: string }): Promise<AuditEntry[]> {
    const all = await this.log.readAll();
    return all.filter((entry) => {
      if (filter.signal && entry.output.signal !== filter.signal) return false;
      if (filter.minConfidence !== undefined && entry.output.confidence < filter.minConfidence) return false;
      if (filter.fromDate && entry.timestamp < filter.fromDate) return false;
      if (filter.toDate && entry.timestamp > filter.toDate) return false;
      return true;
    });
  }

  async getAccuracyStats(): Promise<{ total: number; bullish: number; bearish: number; neutral: number; avgConfidence: number }> {
    const all = await this.log.readAll();
    const counts = { bullish: 0, bearish: 0, neutral: 0 };
    let totalConf = 0;
    for (const e of all) {
      counts[e.output.signal]++;
      totalConf += e.output.confidence;
    }
    return { total: all.length, ...counts, avgConfidence: all.length > 0 ? totalConf / all.length : 0 };
  }
}
