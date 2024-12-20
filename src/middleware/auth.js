import jwt from "jsonwebtoken";
import { config } from "dotenv";

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
    req.user = await Admins.findOne({
      _id: decoded._id,
      isDelete: false,
      accessToken: token,
    });
    if (!req?.user) {
      return res.status(401).json({ error: "You Must Be Logged In" });
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

export const isAuthorization = (roles = []) => {
  try {
    return async (req, res, next) => {
      if (!req.user) {
        return sendResponse(res, false, "You must be logged in");
      }

      if (!roles.includes(req.user.role)) {
        return sendResponse(res, false, "Unauthorized to access");
      }
      return next();
    };
  } catch (error) {
    return sendError(res, error);
  }
};
