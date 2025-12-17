import fs from "fs/promises";
import path from "path";
import { s3, S3_BUCKET } from "../config/aws_config.js";

export const pullRepo = async () => {
  const repoPath = path.join(process.cwd(), ".gitForge");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const data = await s3
      .listObjectsV2({
        Bucket: S3_BUCKET,
        Prefix: "commits/",
      })
      .promise();

    const objects = await data.Contents;

    for (const object of objects) {
      const key = object.Key;
      const commitDir = path.join(
        commitsPath,
        path.dirname(key).split("/").pop()
      );

      await fs.mkdir(commitDir, { recursive: true });

      const params = {
        Bucket: S3_BUCKET,
        Key: key,
      };

      const fileContent = await s3.getObject(params).promise();

      await fs.writeFile(path.join(repoPath, key), fileContent.Body);
      console.log("All file are from S3");
    }
  } catch (err) {
    console.error("Error connecting to pullRpo", err);
  }
};
