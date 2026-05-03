import type { ChainId } from '../../types.js';
import { Logger } from '../../logger.js';

export class RPCClient {
  private rpcUrl: string;
  private chain: ChainId;
  private logger: Logger;

  constructor(rpcUrl: string, chain: ChainId) {
    this.rpcUrl = rpcUrl;
    this.chain = chain;
    this.logger = new Logger({ prefix: `RPC:${chain}` });
  }

  async getBlockNumber(): Promise<number> {
    this.logger.debug('getBlockNumber');
    return 0;
  }

  async getBalance(address: string): Promise<bigint> {
    this.logger.debug(`getBalance: ${address}`);
    return 0n;
  }

  async getLogs(filter: { fromBlock: number; toBlock: number; address?: string; topics?: string[] }): Promise<Record<string, unknown>[]> {
    this.logger.debug('getLogs', filter);
    return [];
  }

  async call(to: string, data: string): Promise<string> {
    this.logger.debug(`call: ${to}`);
    return '0x';
  }

  getChain(): ChainId {
    return this.chain;
  }
}
