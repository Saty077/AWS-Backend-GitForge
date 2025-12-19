import express from "express";
import { Router } from "express";
import userRoute from "./userRoutes.js";

const mainRouter = Router();

mainRouter.use(userRoute);

mainRouter.get("/", (req, res) => {
  res.send("Welcome home!");
});

export default mainRouter;
