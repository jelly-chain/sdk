import { WMarketPredictor } from '../../src/predictor.js';
import { PluginManager } from '../../src/plugins/plugin-manager.js';
import { KeywordPlugin } from '../../src/plugins/builtins/keyword-plugin.js';
import { SentimentPlugin } from '../../src/plugins/builtins/sentiment-plugin.js';

async function main() {
  const manager = new PluginManager();

  await manager.install(new KeywordPlugin());
  await manager.install(new SentimentPlugin());
  await manager.start('builtin-keyword');
  await manager.start('builtin-sentiment');

  console.log('Active plugins:', manager.listAll());

  const predictor = new WMarketPredictor({
    chains: ['bsc', 'ethereum'],
    enableRiskAssessment: true,
  });

  const result = await predictor.predict({ keyword: 'bridge inflow', chain: 'bsc' });
  console.log('Prediction:', result.signal, `(${(result.confidence * 100).toFixed(0)}%)`);

  await manager.stop('builtin-keyword');
  await manager.stop('builtin-sentiment');
}

main().catch(console.error);
