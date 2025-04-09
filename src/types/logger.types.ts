export type LogLevel =
    | "error"
    | "warn"
    | "info"
    | "verbose"
    | "debug"
    | "silly";

export interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    meta?: any;
}

export interface RequestLogEntry extends LogEntry {
    method: string;
    url: string;
    status?: number;
    responseTime?: number;
    ip?: string;
    userAgent?: string;
}
