import type { AgentTool } from '../../../src/agents/tool-adapter.js';
import { getPublicRpcUrls } from '../../../src/chains/rpc.js';
import { getExplorerUrl } from '../../../src/chains/explorers.js';

export function buildChainTools(): AgentTool[] {
  return [
    {
      name: 'wmarket_chain_rpc',
      description: 'Get public RPC URLs for a supported chain',
      parameters: {
        chain: { type: 'string', description: 'Chain identifier (ethereum, bsc, base, polygon)', required: true },
      },
      execute: async (params) => ({ chain: params['chain'], rpcUrls: getPublicRpcUrls(params['chain'] as string) }),
    },
    {
      name: 'wmarket_chain_explorer',
      description: 'Get block explorer URL for a chain',
      parameters: {
        chain: { type: 'string', description: 'Chain identifier', required: true },
      },
      execute: async (params) => ({ chain: params['chain'], explorerUrl: getExplorerUrl(params['chain'] as string) }),
    },
  ];
}
