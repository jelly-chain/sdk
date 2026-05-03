import type { ChainId } from '../../types.js';

export interface Exposure {
  asset: string;
  chain: ChainId;
  valueUsd: number;
  weight: number;
}

export class ExposureMapper {
  compute(positions: Array<{ asset: string; chain: ChainId; valueUsd: number }>): Exposure[] {
    const totalValue = positions.reduce((a, b) => a + b.valueUsd, 0);
    return positions.map((p) => ({ ...p, weight: totalValue > 0 ? p.valueUsd / totalValue : 0 }));
  }

  byChain(exposures: Exposure[]): Record<ChainId, number> {
    const result: Record<string, number> = {};
    for (const e of exposures) {
      result[e.chain] = (result[e.chain] ?? 0) + e.weight;
    }
    return result;
  }
}
