/** Base interface all data providers must implement. */
export interface BaseProvider {
  readonly name: string;
  readonly enabled: boolean;
  healthCheck(): Promise<boolean>;
}

/** Abstract base class with shared provider utilities. */
export abstract class AbstractProvider implements BaseProvider {
  abstract readonly name: string;
  abstract readonly enabled: boolean;

  async healthCheck(): Promise<boolean> {
    return this.enabled;
  }

  protected logRequest(endpoint: string): void {
    if (process.env['SDK_DEBUG']) {
      console.debug(`[${this.name}] Requesting: ${endpoint}`);
    }
  }

  protected handleError(error: unknown, context: string): never {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`[${this.name}] ${context}: ${message}`);
  }

  protected async get<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
    if (!this.enabled) {
      throw new Error(`[${this.name}] Provider is disabled — set the required API key to enable live data`);
    }
    this.logRequest(url);
    const response = await fetch(url, { headers });
    if (!response.ok) {
      this.handleError(new Error(`HTTP ${response.status}`), url);
    }
    return response.json() as Promise<T>;
  }
}
