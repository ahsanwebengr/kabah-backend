

// ************************ send token ******************************
export const sendToken = (res, user, message) => {
  try {
    const token = user.getAuthToken();
    const content = {
      accessToken: token,
      customer: {
        first_name: user?.first_name,
        last_name: user?.last_name,
        isApproved: user?.isApproved,
        role: user?.role,
        verified: user?.verified,
        profile_picture: user?.profile_picture,
        id: user?.id,
      },
    };

    return res
      .status(200)
      .json({ success: true, title: "Success", message, content });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// *************************************** send request response from server *******************************************

// other Response messages
export const sendResponse = (res, success, message, content) => {
  return res.status(200).json({
    success: success,
    title: success ? "Success" : "Error",
    message: message,
    content,
  });
};
// server error response
export const sendError = (res, error) => {
  return res.status(500).json({
    success: false,
    title: "Error",
    message: error.message,
  });
};


// isAuthorization

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

export const UnauthorizedError = (res, success, message, content) => {
  return res.status(401).json({
    success: success,
    title: success ? "Success" : "Error",
    message: message,
    content,
  });
};
