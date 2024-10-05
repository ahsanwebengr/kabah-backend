import { Schema, model } from "mongoose";

const contact_form_Schema = Schema({
  full_name: {
    type: String,
    //required: true,
  },
  contact_no: {
    type: Number,
    //required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  subject: {
    type: String,
    //required: true,
  },
  departure_airport: {
    type: String,
    //required: true,
  },
  hotel_category: {
    type: String,
    enum: ['3_star', '4_star', '5_star', '2_star'],
    //required: true,
  },
  departure_date: {
    type: Date,
    //required: true,
  },
  arrival_date: {
    type: Date,
    //required: true,
  },
  nights_in_makkah: {
    type: Number,
    //required: true,
  },
  nights_in_madinah: {
    type: Number,
    //required: true,
  },
  number_of_passengers: {
    type: Number,
    //required: true,
  },
  children: {
    type: Number,
    //required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'complete'],
    default: 'pending',
  },
  type: {
    type: String,
    enum: ['price_qoute', 'contact'],
    // required: true,
  },
  cratedAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  your_message: {
    type: String,
    // required: true,
  },
});

export default model("contactForm", contact_form_Schema);
