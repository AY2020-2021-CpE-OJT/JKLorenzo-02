export interface StudentData {
  id: string;
  sessions: SessionData[];
  active_log?: LogData;
}

export interface SessionData {
  id: string;
  description?: string;
  logs: LogData[];
}

export interface LogData {
  in: Date;
  out?: Date;
  hrs?: number;
}
