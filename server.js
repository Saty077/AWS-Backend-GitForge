import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { initRepo } from "./controllers/init.js";
import { addRepo } from "./controllers/add.js";
import { commitRepo } from "./controllers/commit.js";
import { pullRepo } from "./controllers/pull.js";
import { pushRepo } from "./controllers/push.js";
import { revertRepo } from "./controllers/revert.js";

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
  console.log("StartServer function is called");
}
