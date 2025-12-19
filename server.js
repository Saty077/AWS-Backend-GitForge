import yargs from "yargs";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import { Server } from "socket.io";
import http from "http";
import mainRouter from "./routes/main.Router.js";

import { hideBin } from "yargs/helpers";
import { initRepo } from "./controllers/init.js";
import { addRepo } from "./controllers/add.js";
import { commitRepo } from "./controllers/commit.js";
import { pullRepo } from "./controllers/pull.js";
import { pushRepo } from "./controllers/push.js";
import { revertRepo } from "./controllers/revert.js";

configDotenv();

yargs(hideBin(process.argv))
  .command("start", "Starts the new server", {}, startServer)
  .command("init", "Initialize the repository", {}, initRepo)
  .command(
    "add <file>",
    "Add a file to the Staging area",
    (yargs) => {
      yargs.positional("file", {
        describe: "To add the file to the Staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    }
  )
  .command(
    "commit <msg>",
    "Commit the staged changes",
    (yargs) => {
      yargs.positional("msg", {
        describe: "Commit Message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.msg);
    }
  )
  .command("pull", "Pull changes form S3", {}, pullRepo)
  .command("push", "push changes to S3", {}, pushRepo)
  .command(
    "revert <commitId>",
    "Revert to specific commit",
    (yargs) => {
      yargs.positional("commitId", {
        describe: "commitId to revert to",
        type: "string",
      });
    },
    (argv) => {
      revertRepo(argv.commitId);
    }
  )
  .demandCommand(1, "Atleast one command is needed")
  .help().argv;

function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());
  app.use(
    cors({
      origin: "*",
    })
  );

  const MongoURI = process.env.MONGO_URL;

  mongoose
    .connect(MongoURI)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.error("Error connecting to DB", err));

  app.use("/", mainRouter);

  const userId = "user1";
  const httpServer = http.createServer(app);
  const io = new Server(
    httpServer,
    cors({
      origin: "*",
      methods: ["GET", "POST"],
    })
  );

  io.on("connection", (socket) => {
    socket.on("joinRoom", (userId) => {
      const user = userId;
      console.log("+++++++++");
      console.log(user);
      console.log("+++++++++");
      socket.join(userId);
    });
  });

  const db = mongoose.connection;

  db.once("open", async () => {
    console.log("CRUD operation called");
  });

  httpServer.listen(port, () => {
    console.log(`Server listening to port: ${port}`);
  });
}
