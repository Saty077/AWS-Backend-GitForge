import mongoose from "mongoose";
import { Schema } from "mongoose";

const issueSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  repository: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Repository",
  },
  status: {
    required: true,
    enum: ["Open", "Closed"],
    default: "Closed",
  },
});

export const Issue = mongoose.model("Issue", issueSchema);
