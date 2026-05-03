import type { StorageAdapter } from './storage-adapter.js';
import { MemoryStore } from './memory-store.js';

export interface MetricRecord {
  key: string;
  value: number;
  labels?: Record<string, string>;
  timestamp: string;
}

export class MetricsStore {
  private store: StorageAdapter;

  constructor(store?: StorageAdapter) {
    this.store = store ?? new MemoryStore();
  }

  async save(record: MetricRecord): Promise<void> {
    const storeKey = `metric:${record.key}:${Date.now()}`;
    await this.store.set(storeKey, record);
  }

  async getRecent(key: string, limitMs = 3_600_000): Promise<MetricRecord[]> {
    const keys = await this.store.keys(`metric:${key}:`);
    const records: MetricRecord[] = [];
    for (const k of keys) {
      const r = await this.store.get<MetricRecord>(k);
      if (r && Date.now() - new Date(r.timestamp).getTime() <= limitMs) {
        records.push(r);
      }
    }
    return records.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  }

  async flush(): Promise<void> {
    await this.store.clear();
  }
}
