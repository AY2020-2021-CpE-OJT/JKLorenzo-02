import express from "express";
import Client from "./modules/Client.js";

const port = process.env.PORT ?? 3000;
const app = express();
const client = new Client(app);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}. Initializing client....`);
  await client.initialize();
  console.log("Client initialized");
});
