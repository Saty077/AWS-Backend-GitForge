import mongoose from "mongoose";
import httpStatus from "http-status";
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";

export const createIssue = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;

  try {
    if (title || description || id)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Missing required fields!" });

    const newIssue = new Issue({
      title,
      description,
      repository: id,
    });

    await newIssue.save();

    res.status(httpStatus.CREATED).json({ message: "Issue Created", newIssue });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err.message);
    console.error("Something went wrong while creating Issue", err.message);
  }
};

export const updateIssueById = async (req, res) => {
  res.send("updateIssueById Called");
};
export const deleteIssueById = async (req, res) => {
  res.send("DeleteIssueById Called");
};
export const getIssueById = async (req, res) => {
  res.send("getIssueById Called");
};
export const getAllIssues = async (req, res) => {
  res.send("getAllIssues Called");
};
