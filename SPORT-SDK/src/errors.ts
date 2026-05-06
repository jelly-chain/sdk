/** SDK error hierarchy — no `as any`. */

export class SportsSdkError extends Error {
  override readonly name: string = 'SportsSdkError';
  constructor(
    message: string,
    public readonly code?: string,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ProviderError extends SportsSdkError {
  override readonly name = 'ProviderError';
  constructor(provider: string, message: string) {
    super(`[${provider}] ${message}`, 'PROVIDER_ERROR');
  }
}

export class RateLimitError extends SportsSdkError {
  override readonly name = 'RateLimitError';
  constructor(provider: string) {
    super(`Rate limit exceeded for provider: ${provider}`, 'RATE_LIMIT');
  }
}

export class AuthError extends SportsSdkError {
  override readonly name = 'AuthError';
  constructor(provider: string) {
    super(`Authentication failed for provider: ${provider}`, 'AUTH_ERROR');
  }
}

export class NotFoundError extends SportsSdkError {
  override readonly name = 'NotFoundError';
  constructor(resource: string, id: string) {
    super(`${resource} not found: ${id}`, 'NOT_FOUND');
  }
}

export class ParseError extends SportsSdkError {
  override readonly name = 'ParseError';
  constructor(message: string) {
    super(`Parse error: ${message}`, 'PARSE_ERROR');
  }
}

export class ConfigError extends SportsSdkError {
  override readonly name = 'ConfigError';
  constructor(message: string) {
    super(`Configuration error: ${message}`, 'CONFIG_ERROR');
  }
}

export function isSportsSdkError(err: unknown): err is SportsSdkError {
  return err instanceof SportsSdkError;
}

export function toSportsSdkError(err: unknown): SportsSdkError {
  if (err instanceof SportsSdkError) return err;
  if (err instanceof Error) return new SportsSdkError(err.message);
  return new SportsSdkError(String(err));
}
