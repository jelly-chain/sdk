export class MetricsCollector {
  private metrics: Map<string, any> = new Map();
  
  record(key: string, value: any): void {
    this.metrics.set(key, {
      value,
      timestamp: Date.now()
    });
  }
  
  get(key: string): any {
    return this.metrics.get(key);
  }
  
  getAll(): Map<string, any> {
    return new Map(this.metrics);
  }
  
  clear(): void {
    this.metrics.clear();
  }
  
  export(): any {
    const result: any = {};
    this.metrics.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
}
