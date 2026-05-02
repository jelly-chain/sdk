export class CacheManager {
  private cache: Map<string, any> = new Map();
  private ttl: Map<string, number> = new Map();
  
  set(key: string, value: any, ttlMs: number = 300000): void {
  this.cache.set(key, value);
    this.ttl.set(key, Date.now() + ttlMs);
  }
  
  get(key: string): any {
    if (this.ttl.has(key) && Date.now() > this.ttl.get(key)!) {
      this.cache.delete(key);
      this.ttl.delete(key);
      return null;
    }
    return this.cache.get(key);
  }
  
  has(key: string): boolean {
    return this.cache.has(key) && (!this.ttl.has(key) || Date.now() <= this.ttl.get(key)!);
  }
  
  delete(key: string): void {
    this.cache.delete(key);
    this.ttl.delete(key);
  }
  
  clear(): void {
    this.cache.clear();
    this.ttl.clear();
  }
}
