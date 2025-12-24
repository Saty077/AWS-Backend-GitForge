import mongoose from "mongoose";
import httpStatus from "http-status";
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";

export const createIssue = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;

  try {
    if (!title || !description || !id)
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
  const { id } = req.params;
  const { ...issueData } = req.body;
  try {
    if (!id)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Invalid id!" });

    const targetIssue = await Issue.findById(id);

    if (!targetIssue)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Issue not found!" });

    Object.assign(targetIssue, issueData);

    const updateIssue = await targetIssue.save();
    res
      .status(httpStatus.OK)
      .json({ message: "Issue updated successfully!", issue: updateIssue });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err.message);
    console.error("Something went wrong while updating Issue", err.message);
  }
};

export const deleteIssueById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Invalid id!" });

    const targetIssue = await Issue.findByIdAndDelete(id);

    if (!targetIssue)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Issue not found!" });

    res.status(httpStatus.OK).json({ message: "Issue deleted!" });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err.message);
    console.error("Something went wrong while deleting Issue", err.message);
  }
};

export const getIssueById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Invalid id!" });

    const targetIssue = await Issue.findById(id);

    if (!targetIssue)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Issue not found!" });

    res
      .status(httpStatus.OK)
      .json({ message: "Issue fetched", issue: targetIssue });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err.message);
    console.error("Something went wrong while fetching Issue", err.message);
  }
};

export const getAllIssues = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Repository id required!" });
    const allIssues = await Issue.find({ repository: id });
    if (!allIssues || allIssues.length === 0)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "No issue found!" });

    res.status(httpStatus.OK).json(allIssues);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err.message);
    console.error(
      "Something went wrong while fetching all Issues",
      err.message
    );
  }
};
