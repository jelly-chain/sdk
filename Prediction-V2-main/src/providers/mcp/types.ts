export interface MCPConfig {
  endpoint?: string;
  apiKey?: string;
  timeout?: number;
}

export interface MCPSwapEvent {
  txHash: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: number;
  amountOut: number;
  sender: string;
  blockNumber: number;
  timestamp: number;
}

export interface MCPLiquidityEvent {
  txHash: string;
  type: 'add' | 'remove';
  token0: string;
  token1: string;
  amount0: number;
  amount1: number;
  blockNumber: number;
  timestamp: number;
}
