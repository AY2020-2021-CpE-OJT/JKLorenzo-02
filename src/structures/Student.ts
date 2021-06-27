import SessionManager from "../managers/SessionManager";
import StudentManager from "../managers/StudentManager";
import Client from "../modules/Client";
import { StudentData } from "../utils/interfaces";

export default class Student {
  readonly client: Client;
  readonly manager: StudentManager;
  readonly sessions: SessionManager;
  private student_id: string;

  constructor(client: Client, manager: StudentManager, data: StudentData) {
    this.client = client;
    this.manager = manager;
    this.sessions = new SessionManager(client, this);
    this.student_id = data.id;
    this._patch(data);
  }

  _patch(data: StudentData) {
    if (data.id) this.student_id = data.id;
    if (data.sessions) this.sessions.load(data.sessions);
    return this;
  }

  get id() {
    return this.student_id;
  }
}
