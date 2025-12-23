import mongoose from "mongoose";
import httpStatus from "http-status";
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";

export const createRepository = async (req, res) => {
  const { owner, name, description, content, visibility, issues } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(owner))
      return res.status(httpStatus.BAD_REQUEST).json("Invalid userid!");

    if (!name) return res.status(httpStatus.BAD_REQUEST).json("Name required!");

    const newRepo = new Repository({
      owner,
      name,
      description,
      content,
      visibility,
      issues,
    });

    const result = await newRepo.save();
    const repoId = result._id.toString();

    res
      .status(httpStatus.CREATED)
      .json({ message: "repo Created!", RepositoryID: repoId });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err.message);
    console.error(
      "Something went wrong while creating Repository",
      err.message
    );
  }
};
export const getAllRepositories = async (req, res) => {
  res.send("getAllRepositories called");
};
export const getRepositoryById = async (req, res) => {
  res.send("getRepositoryById called");
};
export const getRepositoryByName = async (req, res) => {
  res.send("getRepositoryByName called");
};
export const getCurrentUserRepository = async (req, res) => {
  res.send("getCurrentUserRepository called");
};
export const updateRepositoryById = async (req, res) => {
  res.send("updateRepositoryById called");
};
export const deleteRepositoryById = async (req, res) => {
  res.send("deleteRepositoryById called");
};
export const toggleRepositoryById = async (req, res) => {
  res.send("toggleRepositoryById called");
};
