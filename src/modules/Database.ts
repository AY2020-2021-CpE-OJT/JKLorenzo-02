import mongodb, { MongoClient, Db } from "mongodb";
import Student from "../structures/Student.js";
import { StudentData } from "../utils/interfaces.js";
import Client from "./Client.js";

export default class Database {
  private client: Client;
  private mongo_client: MongoClient;
  private db?: Db;
  private db_name: string;

  constructor(client: Client, url: string, name: string) {
    this.client = client;
    this.mongo_client = new mongodb.MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.db_name = name;
  }

  isConnected(): boolean {
    if (!this.mongo_client) return false;
    if (!this.db) return false;
    return this.mongo_client.isConnected();
  }

  async connect(): Promise<void> {
    await this.mongo_client.connect();
    this.db = this.mongo_client.db(this.db_name);
  }

  async disconnect() {
    await this.mongo_client.close();
  }

  async fetchStudents(options?: {
    sortBy?: "id" | "name";
    order?: "asc" | "des";
    limit?: number;
  }): Promise<StudentData[]> {
    if (!this.isConnected()) await this.connect();

    const sortBy = options?.sortBy ?? "id";
    const order = options?.order ?? "asc";

    let cursor = this.db!.collection("students")
      .find()
      .sort(sortBy, order === "asc" ? 1 : -1);

    if (options?.limit && options.limit > 0) {
      cursor = cursor.limit(options.limit);
    }

    const students = await cursor
      .map((student) => ({
        id: student.id,
        active_log: student.active_log,
        sessions: student.sessions,
      }))
      .toArray();

    return students;
  }

  async upsertStudent(student: Student) {
    const collection = this.db!.collection("students");
    await collection.updateOne(
      { id: student.id },
      {
        $set: {
          id: student.id,
          sessions: student.sessions.map((session) => session.toJSON()),
          active_log: student.active_log,
        } as StudentData,
      },
      { upsert: true }
    );
    this.client.student_manager.update(student);
  }
}
