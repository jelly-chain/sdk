import axios from 'axios';
import { Event } from '../types';
import { Logger } from '../logger';

export class OptimismClient {
  private baseUrl = 'https://opt-mainnet.g.alchemy.com/v2/YOUR_KEY';
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
