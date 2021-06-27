import Client from "../modules/Client.js";
import Session from "../structures/Session.js";
import Student from "../structures/Student.js";
import { SessionData } from "../utils/interfaces.js";

export default class SessionManager {
  readonly client: Client;
  readonly student: Student;
  readonly cache: Map<string, Session>;

  constructor(client: Client, student: Student) {
    this.client = client;
    this.student = student;
    this.cache = new Map();
  }

  load(data: SessionData[]) {
    for (const session_data of data) {
      const this_session = new Session(this.client, this, session_data);
      this.cache.set(this_session.id, this_session);
    }
  }
}
