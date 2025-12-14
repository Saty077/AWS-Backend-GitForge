import fs from "fs/promises";
import path from "path";

export const addRepo = async (filePath) => {
  const repoPath = path.resolve(process.cwd(), ".gitForge");
  const stagingPath = path.join(repoPath, "stage");

  try {
    await fs.mkdir(stagingPath, { recursive: true });
    const fileName = path.basename(filePath);
    await fs.copyFile(filePath, path.join(stagingPath, fileName));
    console.log(`File ${fileName} successfully added to the staging area!`);
  } catch (err) {
    console.log("Somthing went wrong in addRepo cmd", err);
  }
};
