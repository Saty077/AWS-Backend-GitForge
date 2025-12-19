import mongoose from "mongoose";
import { Schema } from "mongoose";
import { boolean } from "yargs";

const RepositorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  content: [
    {
      type: String,
    },
  ],
  visibility: {
    type: boolean,
    default: true,
  },
  owner: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  issues: [
    {
      type: Schema.Types.ObjectId,
      ref: "Issue",
    },
  ],
});

export const Repository = mongoose.model("Repository", RepositorySchema);
