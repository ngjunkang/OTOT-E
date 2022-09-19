import express from "express";
import mongoose from "mongoose";
import Redis from "ioredis";

import * as controller from "./controller/student.controller";

// config
const DATABASE_URI = process.env.DATABASE_URI || "mongodb://localhost/students";
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 9090;
const DB_CONNECTION_STRING = !!process.env.DATABASE_URI
  ? "(remote)"
  : "(local)";

const app = express();
const redis = new Redis();

mongoose
  .connect(DATABASE_URI)
  .then(() => {
    console.log("DB connected successfully " + DB_CONNECTION_STRING);
    startServer();
  })
  .catch((error) => console.log(error));

const startServer = () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.get("/", (req, res) =>
    res.send(
      "Hello, welcome to OTOT Task E! Link to set Redis is http://localhost:" +
        PORT +
        "/students"
    )
  );

  app.get("/students", controller.index({ redis }));

  app.listen(PORT, () => {
    console.log("starting server at http://localhost:" + PORT);
  });
};
