import type { EventPayload, ChainId } from '../../src/types.js';

export function makeBridgeEvent(chain: ChainId = 'bsc', volumeUSD = 1_000_000): EventPayload {
  return {
    id: `mock_bridge_${Date.now()}`,
    type: 'bridge_activity',
    chain,
    data: { volumeUSD, fromChain: 'ethereum', toChain: chain },
    timestamp: new Date().toISOString(),
    source: 'mock',
  };
}

export function makeProtocolLaunchEvent(chain: ChainId = 'bsc', protocol = 'MockProtocol'): EventPayload {
  return {
    id: `mock_launch_${Date.now()}`,
    type: 'protocol_launch',
    chain,
    data: { protocol, category: 'DEX' },
    timestamp: new Date().toISOString(),
    source: 'mock',
  };
}

export function makeTVLChangeEvent(chain: ChainId = 'ethereum', changePercent = -15): EventPayload {
  return {
    id: `mock_tvl_${Date.now()}`,
    type: 'tvl_change',
    chain,
    data: { protocol: 'MockProtocol', changePercent },
    timestamp: new Date().toISOString(),
    source: 'mock',
  };
}
