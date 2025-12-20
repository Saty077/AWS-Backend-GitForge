import express from "express";
import { Router } from "express";
import {
  createRepository,
  deleteRepositoryById,
  getAllRepositories,
  getCurrentUserRepository,
  getRepositoryById,
  getRepositoryByName,
  toggleRepositoryById,
  updateRepositoryById,
} from "../controllers/repoController.js";

const repoRouter = Router();

repoRouter.post("/repo/create", createRepository);
repoRouter.get("/repo/all", getAllRepositories);
repoRouter.get("/repo/:id", getRepositoryById);
repoRouter.get("/repo/:name", getRepositoryByName);
repoRouter.get("/repo/:userId", getCurrentUserRepository);
repoRouter.put("/repo/update/:id", updateRepositoryById);
repoRouter.delete("/repo/delete/:id", deleteRepositoryById);
repoRouter.patch("/repo/toggle/:id", toggleRepositoryById);

export default repoRouter;
