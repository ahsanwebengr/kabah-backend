import mongoose, { Schema, model } from "mongoose";
const flytesSchema = mongoose.Schema({
  airline:{
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  flightsNumber: {
    type: Number,
    required: true,
  },
});
export default model("flights", flytesSchema);






