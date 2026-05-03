import type { RPCClient } from './rpc-client.js';

export interface Call {
  target: string;
  callData: string;
  label?: string;
}

export interface CallResult {
  label?: string;
  success: boolean;
  returnData: string;
}

export class Multicall {
  private rpc: RPCClient;

  constructor(rpc: RPCClient) {
    this.rpc = rpc;
  }

  async aggregate(calls: Call[]): Promise<CallResult[]> {
    const results = await Promise.allSettled(
      calls.map((c) => this.rpc.call(c.target, c.callData)),
    );
    return results.map((r, i) => ({
      label: calls[i]?.label,
      success: r.status === 'fulfilled',
      returnData: r.status === 'fulfilled' ? r.value : '0x',
    }));
  }
}
