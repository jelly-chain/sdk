import type { EventPayload } from '../types.js';

export interface Snapshot {
  id: string;
  events: EventPayload[];
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export class SnapshotLoader {
  private snapshots: Map<string, Snapshot> = new Map();

  save(events: EventPayload[], metadata?: Record<string, unknown>): Snapshot {
    const snapshot: Snapshot = {
      id: `snap_${Date.now()}`,
      events: [...events],
      timestamp: new Date().toISOString(),
      metadata,
    };
    this.snapshots.set(snapshot.id, snapshot);
    return snapshot;
  }

  load(id: string): Snapshot | undefined {
    return this.snapshots.get(id);
  }

  list(): { id: string; timestamp: string; eventCount: number }[] {
    return [...this.snapshots.values()].map(({ id, timestamp, events }) => ({
      id,
      timestamp,
      eventCount: events.length,
    }));
  }

  delete(id: string): void {
    this.snapshots.delete(id);
  }
}
