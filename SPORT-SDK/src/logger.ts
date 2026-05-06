/** Structured singleton logger with log levels. */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  level: LogLevel;
  message: string;
  data?: Record<string, unknown>;
  timestamp: string;
}

export class Logger {
  private static instance: Logger | null = null;
  private readonly debug: boolean;

  private constructor() {
    this.debug = !!process.env['SDK_DEBUG'];
  }

  static getInstance(): Logger {
    if (!Logger.instance) Logger.instance = new Logger();
    return Logger.instance;
  }

  private log(level: LogLevel, message: string, data?: Record<string, unknown>): void {
    if (level === 'debug' && !this.debug) return;
    const entry: LogEntry = { level, message, data, timestamp: new Date().toISOString() };
    const prefix = `[sports-jelly-sdk][${level.toUpperCase()}]`;
    if (level === 'error') {
      console.error(prefix, entry.message, data ?? '');
    } else if (level === 'warn') {
      console.warn(prefix, entry.message, data ?? '');
    } else {
      console.log(prefix, entry.message, data ?? '');
    }
  }

  info(message: string, data?: Record<string, unknown>): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: Record<string, unknown>): void {
    this.log('warn', message, data);
  }

  error(message: string, data?: Record<string, unknown>): void {
    this.log('error', message, data);
  }

  debugLog(message: string, data?: Record<string, unknown>): void {
    this.log('debug', message, data);
  }
}
