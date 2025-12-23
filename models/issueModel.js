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
    type: Schema.Types.ObjectId,
    ref: "Repository",
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Open", "Closed"],
    default: "Closed",
  },
});

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
