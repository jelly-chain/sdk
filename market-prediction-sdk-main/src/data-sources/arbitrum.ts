import axios from 'axios';
import { Event } from '../types';
import { Logger } from '../logger';

export class ArbitrumClient {
  private baseUrl = 'https://arb1.arbitrum.io/rpc';
  private logger = Logger.getInstance();
  
  async getTransactionCount(address: string): Promise<number> {
    const response = await axios.post(this.baseUrl, {
      jsonrpc: '2.0',
      method: 'eth_getTransactionCount',
      params: [address, 'latest'],
      id: 1
    });
    return response.data.result;
  }
  
  async getBlockNumber(): Promise<number> {
    const response = await axios.post(this.baseUrl, {
      jsonrpc: '2.0',
      method: 'eth_blockNumber'
    });
    return response.data.result;
  }
}
