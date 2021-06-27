export interface StudentData {
  id: string;
  sessions: SessionData[];
}

export interface SessionData {
  id: string;
  description?: string;
  time_in?: Date;
  time_out?: Date;
}
