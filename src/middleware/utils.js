
import Admins from "../models/admin.js";
import { fileURLToPath } from "url";
// ************************ send token ******************************
export const sendToken = async (res, user, message) => {
  try {
    const token = user.getAuthToken();
    let users = await Users.findById(user._id);
    users.accessToken = token;
    await users.save();
    const content = {
      accessToken: token,
      customer: {
        fullName: users?.fullName,
        id: users?.id,
      },
    };

    return res
      .status(200)
      .json({ success: true, title: "Success", message, content });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// ************************ file Reader ******************************
export const fileReader = async (file) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.resolve(__dirname, file);
  try {
    const data = await fs.readFile(filePath, "utf8");
    const result = JSON.parse(data);
    return result;
  } catch (error) {
    console.log("Error is ", error.message);
    throw new Error("Error reading the file");
  }
};

// ************************ try catch ******************************

export const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.log("🚀 ~ catchAsync ~ err:", err);
    res.status(500).json({ message: err.message });
  });
};








// ************************ admin send token ***************************
export const adminSendToken = async (res, user, message) => {
  try {
    const token = user.getAuthToken();
    let admins = await Admins.findById(user._id);
    admins.accessToken = token;
    await admins.save();
    const content = {
      accessToken: token,
      customer: {
        name: admins?.name,
        surname: admins?.surname,
      },
    };

    return res
      .status(200)
      .json({ success: true, title: "Success", message, content });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const calculateDuration = function calculateDuration( from_date, to_date ) {
  const fromDate = new Date(from_date);
  const toDate = new Date(to_date);
  const durationInMillis = toDate - fromDate;
  const days = Math.floor(durationInMillis / (1000 * 60 * 60 * 24));
  return days;
}
