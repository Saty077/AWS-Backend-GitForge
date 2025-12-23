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
  try {
    const allRepos = await Repository.find({})
      .populate("owner")
      .populate("issues");

    res.json(allRepos);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err.message);
    console.error("Error occured fetching repos: ", err.message);
  }
};

export const getRepositoryById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(httpStatus.BAD_REQUEST).json("Id not valid");

    const repository = await Repository.find({ _id: id })
      .populate("owner")
      .populate("issues");

    if (!repository)
      return res.status(httpStatus.NOT_FOUND).json("Repository not found!");

    res.status(httpStatus.OK).json(repository);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err.message);
    console.error("Error occured fetching repo: ", err.message);
  }
};
export const getRepositoryByName = async (req, res) => {
  const { name } = req.params;
  try {
    if (!name)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json("Please provide a valid name");

    const repository = await Repository.find({ name: name })
      .populate("owner")
      .populate("issues");

    if (!repository)
      return res.status(httpStatus.NOT_FOUND).json("Repository not found!");

    res.status(httpStatus.OK).json(repository);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err.message);
    console.error("Error occured fetching repo: ", err.message);
  }
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
