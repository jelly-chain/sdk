import type { SimulationScenario } from './simulator.js';
import type { ChainId, Timeframe } from '../../types.js';

export class ScenarioBuilder {
  buildKeywordScenarios(keywords: string[], chain: ChainId): SimulationScenario[] {
    return keywords.map((keyword) => ({
      name: `keyword:${keyword}`,
      input: { keyword, chain, timeframe: '1h' as Timeframe },
      parameters: { keyword, chain },
    }));
  }

  buildChainScenarios(chains: ChainId[], keyword: string): SimulationScenario[] {
    return chains.map((chain) => ({
      name: `chain:${chain}`,
      input: { keyword, chain, timeframe: '1h' as Timeframe },
      parameters: { chain, keyword },
    }));
  }

  buildTimeframeScenarios(timeframes: Timeframe[], input: { keyword?: string; chain?: ChainId }): SimulationScenario[] {
    return timeframes.map((timeframe) => ({
      name: `timeframe:${timeframe}`,
      input: { ...input, timeframe },
      parameters: { timeframe },
    }));
  }
}
