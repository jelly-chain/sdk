import type { PredictionInput, PredictionOutput } from '../types.js';

export interface AuditEntry {
  predictionId: string;
  input: PredictionInput;
  output: PredictionOutput;
  latencyMs: number;
  timestamp: string;
}

export class AuditLog {
  private entries: AuditEntry[] = [];

  async write(entry: Omit<AuditEntry, 'timestamp'>): Promise<void> {
    this.entries.push({ ...entry, timestamp: new Date().toISOString() });
  }

  async readAll(): Promise<AuditEntry[]> {
    return [...this.entries];
  }

  async findById(predictionId: string): Promise<AuditEntry | undefined> {
    return this.entries.find((e) => e.predictionId === predictionId);
  }

  async count(): Promise<number> {
    return this.entries.length;
  }

  async clear(): Promise<void> {
    this.entries = [];
  }
}
