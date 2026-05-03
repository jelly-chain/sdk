import { BasePlugin } from '../plugin.js';
import { EventTrigger } from '../../triggers/event-trigger.js';
import type { EventPayload } from '../../types.js';

export class EventPlugin extends BasePlugin {
  readonly name = 'builtin-event';
  readonly version = '2.0.0';
  readonly description = 'Built-in event-based trigger plugin for on-chain event detection';
  readonly capabilities = ['event-trigger'];

  private trigger = new EventTrigger([
    { eventType: 'protocol_launch' },
    { eventType: 'bridge_activity', minValue: 100_000, fieldPath: 'volumeUSD' },
    { eventType: 'tvl_change', minValue: 5, fieldPath: 'changePercent' },
  ]);

  async start(): Promise<void> {
    console.info('[EventPlugin] Started');
  }

  evaluate(event: EventPayload): boolean {
    return this.trigger.evaluate(event);
  }
}
