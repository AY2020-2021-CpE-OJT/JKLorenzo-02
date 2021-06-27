import { Express } from "express";
import StudentManager from "../managers/StudentManager";
import Database from "./Database";

export default class Client {
  readonly app: Express;
  readonly database: Database;
  readonly students: StudentManager;

  constructor(app: Express) {
    this.app = app;
    this.database = new Database(process.env.DB_CREDS!, "students");
    this.students = new StudentManager(this);
  }

  async initialize() {
    await this.database.connect();
    const student_data = await this.database.fetchStudents();
    await this.students.load(student_data);
  }
}
