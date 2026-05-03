import { BasePlugin } from '../plugin.js';
import { KeywordTrigger } from '../../triggers/keyword-trigger.js';

export class KeywordPlugin extends BasePlugin {
  readonly name = 'builtin-keyword';
  readonly version = '2.0.0';
  readonly description = 'Built-in keyword trigger plugin for market event detection';
  readonly capabilities = ['keyword-trigger'];

  private trigger = new KeywordTrigger();

  async start(): Promise<void> {
    console.info('[KeywordPlugin] Started');
  }

  evaluate(text: string): boolean {
    return this.trigger.evaluate(text);
  }
}
