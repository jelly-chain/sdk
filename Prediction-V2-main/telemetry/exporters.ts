import type { SpanContext } from './spans.js';

export interface TelemetryExporter {
  export(spans: SpanContext[]): Promise<void>;
}

export class ConsoleExporter implements TelemetryExporter {
  async export(spans: SpanContext[]): Promise<void> {
    for (const span of spans) {
      console.debug(`[Telemetry] ${span.name} — ${span.duration ?? '?'}ms`, span.attributes);
    }
  }
}

export class OtelHttpExporter implements TelemetryExporter {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async export(_spans: SpanContext[]): Promise<void> {
  }
}
