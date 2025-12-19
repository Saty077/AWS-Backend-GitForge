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

const repoRoute = Router();

repoRoute.post("/repo/create", createRepository);
repoRoute.get("/repo/getAll", getAllRepositories);
repoRoute.get("/repo/:id", getRepositoryById);
repoRoute.get("/repo/:name", getRepositoryByName);
repoRoute.get("/repo/:userId", getCurrentUserRepository);
repoRoute.put("/repo/update/:id", updateRepositoryById);
repoRoute.delete("/repo/delete/:id", deleteRepositoryById);
repoRoute.patch("/repo/toggle/:id", toggleRepositoryById);

export default repoRoute;
