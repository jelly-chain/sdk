export interface SpanContext {
  traceId: string;
  spanId: string;
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  attributes: Record<string, string | number | boolean>;
  events?: SpanEvent[];
  status?: 'ok' | 'error';
  errorMessage?: string;
}

export interface SpanEvent {
  name: string;
  timestamp: number;
  attributes?: Record<string, unknown>;
}

export function addSpanAttribute(span: SpanContext, key: string, value: string | number | boolean): SpanContext {
  return { ...span, attributes: { ...span.attributes, [key]: value } };
}

export function addSpanEvent(span: SpanContext, name: string, attributes?: Record<string, unknown>): SpanContext {
  const event: SpanEvent = { name, timestamp: Date.now(), attributes };
  return { ...span, events: [...(span.events ?? []), event] };
}

export function setSpanError(span: SpanContext, error: Error): SpanContext {
  return { ...span, status: 'error', errorMessage: error.message };
}
