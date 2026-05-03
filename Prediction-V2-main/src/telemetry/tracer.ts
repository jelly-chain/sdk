import type { SpanContext } from './spans.js';

export class Tracer {
  private serviceName: string;

  constructor(serviceName = 'wmarket-prediction-sdk') {
    this.serviceName = serviceName;
  }

  startSpan(name: string, parentContext?: SpanContext): SpanContext {
    return {
      traceId: parentContext?.traceId ?? this.generateId(),
      spanId: this.generateId(),
      name,
      startTime: Date.now(),
      attributes: {},
    };
  }

  endSpan(span: SpanContext): SpanContext {
    return { ...span, endTime: Date.now(), duration: Date.now() - span.startTime };
  }

  private generateId(): string {
    return Math.random().toString(36).slice(2, 18);
  }
}

export const globalTracer = new Tracer();
