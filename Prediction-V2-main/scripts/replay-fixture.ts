import { ReplayEngine } from '../src/replay/replay-engine.js';
import { buildReplayReport } from '../src/replay/replay-report.js';
import type { EventPayload } from '../src/types.js';

const FIXTURE_EVENTS: EventPayload[] = [
  { id: 'fix_1', type: 'bridge_activity', chain: 'bsc', data: { volumeUSD: 1_000_000 }, timestamp: '2025-01-01T00:00:00Z', source: 'fixture' },
  { id: 'fix_2', type: 'protocol_launch', chain: 'ethereum', data: { protocol: 'FixtureProtocol' }, timestamp: '2025-01-01T01:00:00Z', source: 'fixture' },
];

const engine = new ReplayEngine();

const result = await engine.replay(FIXTURE_EVENTS, async (event) => {
  console.log(`[FIXTURE] ${event.type} @ ${event.timestamp}`);
});

const report = buildReplayReport(result, FIXTURE_EVENTS.length);
console.log('\nReport:', report.summary);
