import mongoose, { Schema, model } from "mongoose";
const order_form_Schema = Schema({
  full_name: {
    type: String,
    required: true,
  },
  plan_id: {
    type: Schema.Types.ObjectId,
    ref: "plan",
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  contact_no: {
    type: Number,
    required: true,
  },
  departure_date: {
    type: Date,
    required: true,
  },
  children: {
    type: Number,
    required: true,
  },
  adults: {
    type: Number,
    required: true,
  },
  additional_info: {
    type: String,
  },
  cratedAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export default model("order", order_form_Schema);
