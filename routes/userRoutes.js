import express from "express";
import { Router } from "express";
import {
  deleteUserProfile,
  getAllUsers,
  getUserProfile,
  login,
  signUp,
  updateUserProfile,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/getAllUsers", getAllUsers);
userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.get("/getUserProfile/:id", getUserProfile);
userRouter.put("/updateUserProfile", updateUserProfile);
userRouter.delete("/deleteUserProfile", deleteUserProfile);

export default userRouter;
