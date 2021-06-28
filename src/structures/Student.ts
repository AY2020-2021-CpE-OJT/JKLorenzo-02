import Collection from "@discordjs/collection";
import Client from "../modules/Client.js";
import { LogData, StudentData } from "../utils/interfaces.js";
import Session from "./Session.js";

export default class Student {
  private readonly client: Client;
  id: string;
  active_log?: LogData;
  sessions: Collection<string, Session>;

  constructor(client: Client, data: StudentData) {
    this.client = client;
    this.id = data.id;
    this.active_log = data.active_log;
    this.sessions = new Collection();

    for (const session_data of data.sessions) {
      const this_session = new Session(client, this, session_data);
      this.sessions.set(this_session.id, this_session);
    }
  }

  async log() {
    const today = new Date();
    const hasActiveLog = typeof this.active_log !== "undefined";
    const session_id = `${today.getMonth()}-${today.getDate()}-${today.getFullYear()}`;
    const this_log = this.active_log ?? { in: new Date() };
    let this_session = [...this.sessions.array()].pop();

    if (hasActiveLog) {
      this_log.out = today;
      this_log.hrs = Math.floor(
        ((today.getTime() - this_log.in.getTime()) % 86400000) / 3600000
      );
      this.active_log = undefined;
    } else {
      this.active_log = { in: today };
    }

    if (hasActiveLog) {
      if (this_session?.id === session_id) {
        // insert this log to the session logs
        this_session = new Session(this.client, this, {
          id: session_id,
          logs: [...this_session.logs, this_log],
        });
      } else {
        this_session = new Session(this.client, this, {
          id: session_id,
          logs: [this_log],
        });
      }
      this.sessions.set(session_id, this_session);
    }
    await this.client.database.upsertStudent(this);
  }

  toJSON(): StudentData {
    return {
      id: this.id,
      sessions: this.sessions.map((session) => session.toJSON()),
      active_log: this.active_log,
    };
  }
}
