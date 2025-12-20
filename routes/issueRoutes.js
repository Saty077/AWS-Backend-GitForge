import express from "express";
import { Router } from "express";
import {
  createIssue,
  deleteIssueById,
  getAllIssues,
  getIssueById,
  updateIssueById,
} from "../controllers/issueController.js";

const issueRouter = Router();

issueRouter.post("/issue/create", createIssue);
issueRouter.put("/issue/update/:id", updateIssueById);
issueRouter.delete("/issue/delete/:id", deleteIssueById);
issueRouter.get("/issue/all", getAllIssues);
issueRouter.get("/issue/:id", getIssueById);

export default issueRouter;
