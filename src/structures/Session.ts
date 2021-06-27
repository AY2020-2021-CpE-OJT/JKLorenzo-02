import { v4 as uuid } from "uuid";
import SessionManager from "../managers/SessionManager";
import Client from "../modules/Client";
import { SessionData } from "../utils/interfaces";

export default class Session {
  readonly client: Client;
  readonly manager: SessionManager;
  private data: SessionData;

  constructor(client: Client, manager: SessionManager, data: SessionData) {
    this.client = client;
    this.manager = manager;
    this.data = {
      id: uuid(),
    };
    this._patch(data);
  }

  _patch(data: SessionData) {
    if (data.id) this.data.id = data.id;
    if (data.description) this.data.description = data.description;
    if (data.time_in) this.data.time_in = data.time_in;
    if (data.time_out) this.data.time_out = data.time_out;
    return this;
  }

  get id() {
    return this.data.id!;
  }

  get description() {
    return this.data.description;
  }

  get time_in() {
    return this.data.time_in;
  }

  get time_out() {
    return this.data.time_out;
  }

  toJSON(): SessionData {
    return {
      id: this.data.id,
      description: this.data.description,
      time_in: this.data.time_in,
      time_out: this.data.time_out,
    };
  }
}
