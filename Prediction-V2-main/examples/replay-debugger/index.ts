import { ReplayEngine } from '../../src/replay/replay-engine.js';
import { SnapshotLoader } from '../../src/replay/snapshot-loader.js';
import { buildReplayReport } from '../../src/replay/replay-report.js';
import { WMarketPredictor } from '../../src/predictor.js';
import type { EventPayload } from '../../src/types.js';

const MOCK_EVENTS: EventPayload[] = [
  { id: 'evt_1', type: 'bridge_activity', chain: 'bsc', data: { volumeUSD: 2_000_000 }, timestamp: '2025-01-01T10:00:00Z', source: 'mcp' },
  { id: 'evt_2', type: 'protocol_launch', chain: 'bsc', data: { protocol: 'TestDeFi' }, timestamp: '2025-01-01T10:05:00Z', source: 'mcp' },
  { id: 'evt_3', type: 'tvl_change', chain: 'ethereum', data: { changePercent: 12 }, timestamp: '2025-01-01T10:10:00Z', source: 'llamafi' },
];

async function main() {
  const snapshots = new SnapshotLoader();
  const snapshot = snapshots.save(MOCK_EVENTS, { description: 'Demo replay' });

  const predictor = new WMarketPredictor({ chains: ['bsc', 'ethereum'] });
  const engine = new ReplayEngine();

  const result = await engine.replay(MOCK_EVENTS, async (event) => {
    console.log(`[REPLAY] Processing event: ${event.type} on ${event.chain}`);
    if (event.type !== 'tvl_change') {
      const prediction = await predictor.predict({ chain: event.chain });
      console.log(`  → Prediction: ${prediction.signal}`);
    }
  });

  const report = buildReplayReport(result, MOCK_EVENTS.length, snapshot.id);
  console.log('\nReplay report:', report.summary);
}

main().catch(console.error);
