import Client from "./Client.js";
import express, { Express } from "express";

export default class API {
  readonly app: Express;
  readonly client: Client;

  constructor(client: Client) {
    this.app = client.app;
    this.client = client;

    // middleware
    this.client.app.use(express.json());
  }

  start() {
    this.app.get("/api", (req, res) => {
      res.send("online");
    });

    // Fetches all the students
    this.app.get("/api/students", (req, res) => {
      const students = this.client.student_manager.getAll();
      res.json({
        students: students,
        length: students.length,
      });
    });

    // Fetches a student
    this.app.get("/api/students/:id", (req, res) => {
      const this_student = this.client.student_manager.get(req.params.id);
      if (!this_student) return res.status(404).send("STUDENT_NOT_FOUND");
      res.json(this_student.toJSON());
    });

    // Logs the student
    this.app.post("/api/students/:id", async (req, res) => {
      const result = await this.client.student_manager.logStudent(
        req.params.id
      );
      res.json(result.toJSON());
    });

    // Fetches the sessions of a student
    this.app.get("/api/students/:id/sessions", (req, res) => {
      const this_student = this.client.student_manager.get(req.params.id);
      if (!this_student) return res.status(404).send("STUDENT_NOT_FOUND");
      res.json(this_student.sessions.map((session) => session.toJSON()));
    });

    // Fetches a session of a student
    this.app.get("/api/students/:id/sessions/:sid", async (req, res) => {
      const student = await this.client.student_manager.get(req.params.id);
      if (!student) return res.status(404).send("STUDENT_NOT_FOUND");
      const session = student?.sessions.get(req.params.sid);
      if (!session) return res.status(404).send("SESSION_NOT_FOUND");
      res.json(session.toJSON());
    });

    // Update the description of a session of a student
    this.app.patch("/api/students/:id/sessions/:sid", async (req, res) => {
      const student = await this.client.student_manager.get(req.params.id);
      if (!student) return res.status(404).send("STUDENT_NOT_FOUND");
      const session = student?.sessions.get(req.params.sid);
      if (!session) return res.status(404).send("SESSION_NOT_FOUND");
      if (!req.body.description)
        return res.status(400).send("DESCRIPTION_NOT_SET");
      const result = await session.setDescription(req.body.description);
      res.json(result.toJSON());
    });
  }
}
