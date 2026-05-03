import type { SpanContext } from './spans.js';

export type SpanObserver = (span: SpanContext) => void;

const observers: SpanObserver[] = [];

export function registerSpanObserver(observer: SpanObserver): () => void {
  observers.push(observer);
  return () => {
    const idx = observers.indexOf(observer);
    if (idx >= 0) observers.splice(idx, 1);
  };
}

export function notifySpanComplete(span: SpanContext): void {
  for (const observer of observers) {
    try {
      observer(span);
    } catch {
    }
  }
}

export function clearObservers(): void {
  observers.length = 0;
}
