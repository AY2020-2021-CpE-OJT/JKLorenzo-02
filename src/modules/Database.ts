import { MongoClient, Db } from "mongodb";
import { SessionData, StudentData } from "../utils/interfaces.js";

export default class Database {
  private mongo_client: MongoClient;
  private db?: Db;
  private db_name: string;

  constructor(uri: string, name: string) {
    this.mongo_client = new MongoClient(uri, { useNewUrlParser: true });
    this.db_name = name;
  }

  async connect(): Promise<void> {
    await this.mongo_client.connect();
    this.db = this.mongo_client.db(this.db_name);
  }

  isConnected(): boolean {
    if (!this.mongo_client) return false;
    if (!this.db) return false;
    return this.mongo_client.isConnected();
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
      .map((document) => {
        return {
          id: document._id,
          sessions: Array(document.sessions).map((element) => {
            return {
              id: element._id,
              description: element.description,
              time_in: element.time_in,
              time_out: element.time_out,
            } as SessionData;
          }),
        } as StudentData;
      })
      .toArray();

    return students ?? [];
  }
}
