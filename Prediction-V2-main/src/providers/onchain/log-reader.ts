import type { RPCClient } from './rpc-client.js';
import { Logger } from '../../logger.js';

export interface LogFilter {
  fromBlock: number;
  toBlock: number;
  address?: string;
  topics?: string[];
}

export class LogReader {
  private rpc: RPCClient;
  private logger = new Logger({ prefix: 'LogReader' });

  constructor(rpc: RPCClient) {
    this.rpc = rpc;
  }

  async readLogs(filter: LogFilter): Promise<Record<string, unknown>[]> {
    this.logger.debug('Reading logs', filter);
    return this.rpc.getLogs(filter);
  }

  async readLogsInRange(fromBlock: number, toBlock: number, chunkSize = 1000): Promise<Record<string, unknown>[]> {
    const results: Record<string, unknown>[] = [];
    for (let from = fromBlock; from <= toBlock; from += chunkSize) {
      const to = Math.min(from + chunkSize - 1, toBlock);
      const logs = await this.readLogs({ fromBlock: from, toBlock: to });
      results.push(...logs);
    }
    return results;
  }
}
