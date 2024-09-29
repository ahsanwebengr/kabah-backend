import jwt from "jsonwebtoken";
import { config } from "dotenv";

import Users from "../models/auth.js";
import Admins from "../models/admin.js";
import {
  sendError,
  sendResponse,
  UnauthorizedError,
} from "../sender/sender.js";
config();

export const isUser = async (req, res, next) => {
  try {
    let token = req?.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return sendResponse(res, false, "You must be logged in");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await Users.findById(decoded._id);
    if (req?.user?.accessToken != token) {
      return res.status(203).json({ message: "You Must Be Logged In" });
    }
    next();
  } catch (error) {
    return sendError(res, error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    let token = req?.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return UnauthorizedError(res, false, "You must be logged in");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await Admins.findById(decoded._id);
    if (req?.user?.accessToken != token) {
      return UnauthorizedError(res, false, "You must be logged in");
    }
    next();
  } catch (error) {
    return sendError(res, error);
  }
};
export const isAuthorize = (roles = []) => {
  try {
    return async (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return UnauthorizedError(res, false, "Unauthorized to access");
      }
      return next();
    };
  } catch (error) {
    return sendError(res, error);
  }
};
