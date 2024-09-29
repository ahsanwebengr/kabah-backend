import { Schema, model } from "mongoose";

const contact_form_Schema = Schema({
  departure_airport: {
    type: String,
    required: true,
  },
  hotel_category: {
    type: String,
    enum: ["3star", "4star", "5star"],
    required: true,
  },
  departure_date: {
    type: Date,
    required: true,
  },
  arrival_date: {
    type: Date,
    required: true,
  },
  nights_in_makkah: {
    type: Number,
    required: true,
  },
  nights_in_madinah: {
    type: Number,
    required: true,
  },
  number_of_passengers: {
    type: Number,
    required: true,
  },
  children: {
    type: Number,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  contact_no: {
    type: Number,
    required: true,
  },
  cratedAt:{
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
});

export default model("contactForm", contact_form_Schema);
