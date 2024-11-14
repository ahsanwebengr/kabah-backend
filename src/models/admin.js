import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  role: {
    type: String,
  },
  accessToken: [{ type: String }],
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  phone: {
    type: Number,
    required: [true, "phone is required"],
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

adminSchema.methods.isMatchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.getAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
};

const Admins = mongoose.model("Admin", adminSchema);

export default Admins;
