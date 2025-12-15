import fs from "fs/promises";
import path from "path";
import { s3, S3_BUCKET } from "../config/aws_config.js";

export const pushRepo = async () => {
  const repoPath = path.join(process.cwd(), ".gitForge");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDirs = await fs.readdir(commitsPath);
    for (const commitDir of commitDirs) {
      const commitDirPath = path.join(commitsPath, commitDir);
      const files = await fs.readdir(commitDirPath);

      for (const file of files) {
        const filePath = path.join(commitDirPath, file);
        const fileContent = await fs.readFile(filePath);

        const params = {
          Bucket: S3_BUCKET,
          Key: `commits/${commitDir}/${file}`,
          Body: fileContent,
        };
        await s3.upload(params).promise();
      }
    }
    console.log(`All commits are pushed to S3`);
  } catch (err) {
    console.error("Error pushing to S3: ", err);
  }
};
