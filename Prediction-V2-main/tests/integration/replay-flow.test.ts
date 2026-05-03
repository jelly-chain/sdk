import { describe, it, expect } from 'vitest';
import { ReplayEngine } from '../../src/replay/replay-engine.js';
import { SnapshotLoader } from '../../src/replay/snapshot-loader.js';
import { buildReplayReport } from '../../src/replay/replay-report.js';
import type { EventPayload } from '../../src/types.js';

describe('Replay flow', () => {
  const events: EventPayload[] = [
    { id: 'e1', type: 'bridge_activity', chain: 'bsc', data: { vol: 1e6 }, timestamp: '2025-01-01T00:00:00Z', source: 'test' },
    { id: 'e2', type: 'tvl_change', chain: 'ethereum', data: { change: 5 }, timestamp: '2025-01-01T01:00:00Z', source: 'test' },
  ];

  it('should replay events and produce a report', async () => {
    const engine = new ReplayEngine();
    const result = await engine.replay(events, async () => {});
    expect(result.processed).toBe(2);
    expect(result.errors).toBe(0);

    const report = buildReplayReport(result, events.length);
    expect(report.totalEvents).toBe(2);
    expect(report.errorRate).toBe(0);
  });

  it('should save and load snapshots', () => {
    const loader = new SnapshotLoader();
    const snap = loader.save(events);
    const loaded = loader.load(snap.id);
    expect(loaded?.events.length).toBe(2);
  });
});
