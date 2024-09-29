import { Schema, model } from "mongoose";

const blog_schema = Schema({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  cratedAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Blog", blog_schema);
