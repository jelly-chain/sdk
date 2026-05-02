import axios from 'axios';
import { Event } from '../types';
import { Logger } from '../logger';

export class PolygonClient {
  private baseUrl = 'https://polygon-rpc.com';
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
  
  async getBlockByNumber(block: string): Promise<any> {
    const response = await axios.post(this.baseUrl, {
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: [block, true],
      id: 1
    });
    return response.data.result;
  }
}
