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

const userRoute = Router();

userRoute.get("/getAllUsers", getAllUsers);
userRoute.post("/signup", signUp);
userRoute.post("/login", login);
userRoute.get("/getUserProfile", getUserProfile);
userRoute.put("/updateUserProfile", updateUserProfile);
userRoute.delete("/deleteUserProfile", deleteUserProfile);

export default userRoute;
