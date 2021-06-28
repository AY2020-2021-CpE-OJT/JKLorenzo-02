import Client from "../modules/Client.js";
import { LogData, SessionData } from "../utils/interfaces.js";
import Student from "./Student.js";

export default class Session {
  private readonly client: Client;
  private readonly student: Student;
  id: string;
  description?: string;
  logs: LogData[];

  constructor(client: Client, student: Student, data: SessionData) {
    this.client = client;
    this.student = student;
    this.id = data.id;
    this.description = data.description;
    this.logs = data.logs;
  }

  async setDescription(content: string) {
    this.description = content;
    this.student.sessions.set(this.id, this);
    await this.client.database.upsertStudent(this.student);
    return this.student;
  }

  toJSON(): SessionData {
    return {
      id: this.id,
      description: this.description,
      logs: this.logs,
    };
  }
}
