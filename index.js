const express = require("express")
require('dotenv').config();
const cors = require("cors");
const { Client } = require("pg");
const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "chrome-extension://nbjkjkdhneemijlecobbdkodeecpfbjm",
  })
);

const client = new Client({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  ssl: true,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
});

app.get("/", async (req, res) => {
  try {
    await client.connect();
    console.log("Connected to postgres database");
  } catch (error) {
    console.log("error connecting to postgressql database", error);
  }

  client.end()

  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
