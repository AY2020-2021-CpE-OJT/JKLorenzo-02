import Client from "../modules/Client.js";
import Database from "../modules/Database.js";
import Student from "../structures/Student.js";
import { StudentData } from "../utils/interfaces.js";

export default class StudentManager {
  readonly client: Client;
  readonly cache: Map<string, Student>;

  constructor(client: Client) {
    this.client = client;
    this.cache = new Map();
  }

  load(data: StudentData[]) {
    for (const student_data of data) {
      const this_student = new Student(this.client, this, student_data);
      this.cache.set(this_student.id, this_student);
    }
  }
}
