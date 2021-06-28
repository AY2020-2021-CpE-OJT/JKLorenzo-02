import { Express } from "express";
import StudentManager from "../managers/StudentManager.js";
import API from "./API.js";
import Database from "./Database.js";

export default class Client {
  readonly app: Express;
  readonly api: API;
  readonly database: Database;
  readonly student_manager: StudentManager;

  constructor(app: Express) {
    this.app = app;
    this.api = new API(this);
    this.database = new Database(this, process.env.DB_CREDS!, "students");
    this.student_manager = new StudentManager(this);
  }

  async initialize() {
    // Connect to the database
    await this.database.connect();

    // Load the student manager
    await this.student_manager.load();

    // Start API
    await this.api.start();
  }
}
