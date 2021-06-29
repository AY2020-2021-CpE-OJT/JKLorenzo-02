import Client from "../modules/Client.js";
import Collection from "@discordjs/collection";
import Student from "../structures/Student.js";

export default class StudentManager {
  private readonly client: Client;
  private readonly cache: Collection<string, Student>;

  constructor(client: Client) {
    this.client = client;
    this.cache = new Collection();
  }

  get(id: string) {
    return this.cache.get(id);
  }

  getAll() {
    return this.cache.array();
  }

  update(student: Student) {
    this.cache.set(student.id, student);
  }

  async load() {
    const students = await this.client.database.fetchStudents();
    for (const student_data of students) {
      const this_student = new Student(this.client, student_data);
      this.update(this_student);
    }
  }

  async logStudent(id: string) {
    const this_student =
      this.get(id) ?? new Student(this.client, { id: id, sessions: [] });
    await this_student.log();
    return this_student;
  }
}
