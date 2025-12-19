import express from "express";
import { Router } from "express";
import userRoute from "./userRoutes.js";
import repoRoute from "./repoRoutes.js";

const mainRouter = Router();

mainRouter.use(userRoute);
mainRouter.use(repoRoute);

mainRouter.get("/", (req, res) => {
  res.send("Welcome home!");
});

export default mainRouter;
