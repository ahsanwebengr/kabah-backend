import { Schema, model } from "mongoose";

const additionalPagesSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Title is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

const AdditionalPage = model("AdditionalPage", additionalPagesSchema);

export default AdditionalPage;
