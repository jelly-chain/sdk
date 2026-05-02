export class MarketPredictionError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: any
  ) {
    super(message);
    this.name = 'MarketPredictionError';
  }
}

export class ApiError extends MarketPredictionError {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly response?: any
  ) {
    super(message, 'API_ERROR', { statusCode, response });
  }
}

export class ValidationError extends MarketPredictionError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR');
  }
}

export class NetworkError extends MarketPredictionError {
  constructor(message: string) {
    super(message, 'NETWORK_ERROR');
  }
}

export class PredictionError extends MarketPredictionError {
  constructor(message: string) {
    super(message, 'PREDICTION_ERROR');
  }
}
