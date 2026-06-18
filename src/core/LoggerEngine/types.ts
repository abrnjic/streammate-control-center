export enum LogLevel {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  DEBUG = 'DEBUG',
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: number;
}
