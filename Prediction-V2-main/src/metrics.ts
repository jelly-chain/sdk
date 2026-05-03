interface MetricEntry {
  value: number;
  timestamp: number;
  labels?: Record<string, string>;
}

export class MetricsCollector {
  private counters: Map<string, number> = new Map();
  private gauges: Map<string, MetricEntry[]> = new Map();
  private histograms: Map<string, number[]> = new Map();

  record(key: string, value: number, labels?: Record<string, string>): void {
    if (!this.gauges.has(key)) this.gauges.set(key, []);
    this.gauges.get(key)!.push({ value, timestamp: Date.now(), labels });
  }

  increment(counter: string, by = 1): void {
    this.counters.set(counter, (this.counters.get(counter) ?? 0) + by);
  }

  observe(histogram: string, value: number): void {
    if (!this.histograms.has(histogram)) this.histograms.set(histogram, []);
    this.histograms.get(histogram)!.push(value);
  }

  getCounter(key: string): number {
    return this.counters.get(key) ?? 0;
  }

  getGauge(key: string): MetricEntry[] {
    return this.gauges.get(key) ?? [];
  }

  getLatest(key: string): number | null {
    const entries = this.gauges.get(key);
    if (!entries || entries.length === 0) return null;
    return entries[entries.length - 1]!.value;
  }

  getHistogramPercentile(key: string, p: number): number | null {
    const values = this.histograms.get(key);
    if (!values || values.length === 0) return null;
    const sorted = [...values].sort((a, b) => a - b);
    const idx = Math.ceil((p / 100) * sorted.length) - 1;
    return sorted[Math.max(0, idx)] ?? null;
  }

  exportAll(): Record<string, unknown> {
    return {
      counters: Object.fromEntries(this.counters),
      gauges: Object.fromEntries(
        [...this.gauges.entries()].map(([k, v]) => [k, v.at(-1)?.value]),
      ),
      histograms: Object.fromEntries(
        [...this.histograms.entries()].map(([k, v]) => [k, { count: v.length, p50: this.getHistogramPercentile(k, 50), p95: this.getHistogramPercentile(k, 95), p99: this.getHistogramPercentile(k, 99) }]),
      ),
    };
  }

  clear(): void {
    this.counters.clear();
    this.gauges.clear();
    this.histograms.clear();
  }
}
