import Admin from "../../models/admin.js";

import {
  adminRegisterValidation,
  loginValidation,
} from "../../verification/api_verification.js";

import { catchAsync, adminSendToken } from "../../middleware/utils.js";
import bcrypt from "bcryptjs";

// Register
export const register = catchAsync(async (req, res) => {
  const checkEmail = await Admin.findOne({ email: req.body.email });
  if (checkEmail) {
    return res.status(203).json({ error: "Email Already Exists" });
  }

  const { error, value } = adminRegisterValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(value.password, salt);
  req.body.password = hashPassword;

  const admin = new Admin(req.body);
  await admin.save();

  return res
    .status(200)
    .json({ message: `Admin Registered Successfully` });
});

// Login
export const login = catchAsync(async (req, res) => {
  const { error } = loginValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, password } = req.body;
  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin || admin.isDelete) {
    return res.status(404).json({ error: "Invalid Email & Password" });
  }

  const isMatch = await admin.isMatchPassword(password);
  if (!isMatch) {
    return res.status(404).json({ error: "Invalid Email & Password" });
  }

  return adminSendToken(res, admin, "Login Successfully");
});

// Logout API
export const logOut = catchAsync(async (req, res) => {
  const admin = await Admin.findById(req.user.id);
  if (!admin) {
    return res.status(404).json({ error: "User Not Found" });
  }

  admin.accessToken = "";
  await admin.save();

  return res.status(200).json({ message: "Logged Out Successfully" });
});

// Send OTP
export const sendOtp = catchAsync(async (req, res) => {
  let { email } = req.body;
  const regexEmail = /^\S+@\S+\.\S+$/;
  email = email.toLowerCase();

  if (!regexEmail.test(email)) {
    return res.status(400).json({ message: "Enter Valid E-mail" });
  }

  const admin = await Admin.findOne({ email });
  if (!admin || admin.isDelete) {
    return res.status(404).json({ message: "Admin Not Found" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpExpireTime = new Date(Date.now() + 60 * 1000);

  await Admin.updateOne(
    { email },
    {
      $set: { otp, OTPExpireTime: otpExpireTime },
    }
  );

  return res.status(200).json({ message: "OTP Sent Successfully" });
});

// Verify OTP
export const verifyOTP = catchAsync(async (req, res) => {
  const { email, otp } = req.body;
  const verifyOTP = await Admin.findOne({ email, otp });

  if (!verifyOTP) {
    return res.status(404).json({ message: "Invalid OTP" });
  }

  const time = Date.now();
  if (verifyOTP.OTPExpireTime < time) {
    return res.status(404).json({ message: "OTP Expired" });
  }
});

