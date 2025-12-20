import express from "express";
import { Router } from "express";
import issueRouter from "./issueRoutes.js";
import repoRouter from "./repoRoutes.js";
import userRouter from "./userRoutes.js";

const mainRouter = Router();

mainRouter.use(userRouter);
mainRouter.use(repoRouter);
mainRouter.use(issueRouter);

mainRouter.get("/", (req, res) => {
  res.send("Welcome home!");
});

export default mainRouter;
