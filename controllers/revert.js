import fs from "fs";
import path from "path";
import { promisify } from "util";

const readdir = promisify(fs.readdir);
const copyfile = promisify(fs.copyFile);

export const revertRepo = async (commitId) => {
  const repoPath = path.join(process.cwd(), ".gitForge");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitsDir = path.join(commitsPath, commitId);
    const files = await readdir(commitsDir);
    const parentDir = path.resolve(repoPath, "..");
    for (const file of files) {
      await copyfile(path.join(commitsDir, file), path.join(parentDir, file));
    }
    console.log(`Successfully reverted to commit ${commitId}`);
  } catch (err) {
    console.error("Error occured in reverting files", err);
  }
};
