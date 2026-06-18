import { LogLevel, LogEntry } from './types';

/**
 * Central logging service for the Control Center.
 * Every future module must use this logger to ensure consistent logging.
 */
export class LoggerEngine {
  private logs: LogEntry[] = [];
  private listeners: ((log: LogEntry) => void)[] = [];

  /**
   * Subscribe to incoming log events.
   */
  public subscribe(listener: (log: LogEntry) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private log(level: LogLevel, message: string): void {
    const entry: LogEntry = { level, message, timestamp: Date.now() };
    this.logs.push(entry);
    this.listeners.forEach(l => l(entry));
  }

  public info(message: string): void { this.log(LogLevel.INFO, message); }
  public warning(message: string): void { this.log(LogLevel.WARNING, message); }
  public error(message: string): void { this.log(LogLevel.ERROR, message); }
  public success(message: string): void { this.log(LogLevel.SUCCESS, message); }
  public debug(message: string): void { this.log(LogLevel.DEBUG, message); }

  public getLogs(): LogEntry[] { return [...this.logs]; }
}
