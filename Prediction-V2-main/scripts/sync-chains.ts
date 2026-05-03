import { CHAIN_IDS, CHAIN_NAMES, CHAIN_NUMERIC_IDS } from '../src/constants/chains.js';

console.log('Syncing supported chain metadata...');

const chainData = Object.entries(CHAIN_IDS).map(([key, id]) => ({
  key,
  id,
  name: CHAIN_NAMES[id as keyof typeof CHAIN_NAMES],
  numericId: CHAIN_NUMERIC_IDS[id as keyof typeof CHAIN_NUMERIC_IDS],
}));

console.table(chainData);
console.log(`\nTotal chains: ${chainData.length}`);
