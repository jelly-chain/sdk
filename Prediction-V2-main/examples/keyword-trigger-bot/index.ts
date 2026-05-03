import { WMarketPredictor } from '../../src/predictor.js';
import { KeywordTrigger } from '../../src/triggers/keyword-trigger.js';

const WATCH_KEYWORDS = ['rug pull', 'protocol launch', 'bridge inflow', 'exploit', 'listing'];

async function handleKeywordEvent(keyword: string, predictor: WMarketPredictor): Promise<void> {
  const trigger = new KeywordTrigger();
  const isTriggered = trigger.evaluate(keyword);
  if (!isTriggered) return;

  console.log(`[BOT] Keyword triggered: "${keyword}"`);
  const result = await predictor.predict({ keyword, chain: 'bsc' });
  console.log(`  Signal: ${result.signal} | Confidence: ${(result.confidence * 100).toFixed(0)}% | Risk: ${(result.riskScore * 100).toFixed(0)}%`);
  console.log(`  Factors: ${result.factors.join(', ')}`);
}

async function main() {
  const predictor = new WMarketPredictor({ chains: ['bsc'], enableRiskAssessment: true });

  for (const keyword of WATCH_KEYWORDS) {
    await handleKeywordEvent(keyword, predictor);
  }
}

main().catch(console.error);
