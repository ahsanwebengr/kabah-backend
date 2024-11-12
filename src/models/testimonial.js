import { Schema, model } from "mongoose";

const testimonial_schema = Schema({
  rating: {
    type: Number,
    unique: true,
  },
  review: {
    type: String,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  cratedAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Testimonial", testimonial_schema);
