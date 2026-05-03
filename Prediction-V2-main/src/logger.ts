type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerOptions {
  level?: LogLevel;
  prefix?: string;
}

const LEVELS: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 };

export class Logger {
  private level: LogLevel;
  private prefix: string;

  constructor(options: LoggerOptions = {}) {
    this.level = options.level ?? 'info';
    this.prefix = options.prefix ?? 'WMarket';
  }

  private shouldLog(level: LogLevel): boolean {
    return LEVELS[level] >= LEVELS[this.level];
  }

  private format(level: LogLevel, message: string, data?: unknown): string {
    const ts = new Date().toISOString();
    const base = `[${ts}] [${this.prefix}] [${level.toUpperCase()}] ${message}`;
    return data !== undefined ? `${base} ${JSON.stringify(data)}` : base;
  }

  debug(message: string, data?: unknown): void {
    if (this.shouldLog('debug')) console.debug(this.format('debug', message, data));
  }

  info(message: string, data?: unknown): void {
    if (this.shouldLog('info')) console.info(this.format('info', message, data));
  }

  warn(message: string, data?: unknown): void {
    if (this.shouldLog('warn')) console.warn(this.format('warn', message, data));
  }

  error(message: string, data?: unknown): void {
    if (this.shouldLog('error')) console.error(this.format('error', message, data));
  }

  child(prefix: string): Logger {
    return new Logger({ level: this.level, prefix: `${this.prefix}:${prefix}` });
  }
}
