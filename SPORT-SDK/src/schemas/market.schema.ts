import { NormalizedMarket } from '../normalizers/market-normalizer.js';

export function isNormalizedMarket(val: unknown): val is NormalizedMarket {
  if (typeof val !== 'object' || val === null) return false;
  const m = val as Record<string, unknown>;
  return (
    typeof m['id'] === 'string' &&
    typeof m['platform'] === 'string' &&
    typeof m['question'] === 'string' &&
    typeof m['sport'] === 'string' &&
    typeof m['league'] === 'string' &&
    typeof m['marketType'] === 'string' &&
    typeof m['resolved'] === 'boolean'
  );
}
