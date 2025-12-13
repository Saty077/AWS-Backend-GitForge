import fs from "fs/promises";
import path from "path";

export const initRepo = async () => {
  const repoPath = path.resolve(process.cwd(), ".gitTracker");
  const commitPath = path.join(repoPath, "commits");

  try {
    await fs.mkdir(repoPath, { recursive: true });
    await fs.mkdir(commitPath, { recursive: true });
    await fs.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify({ BUCKET: process.env.S3_BUCKET })
    );

    console.log("Repository initialized!");
  } catch (err) {
    console.log("Something went wrong while initializing repo", err);
  }
};
