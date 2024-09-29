import Plans from "../../models/plan.js";
import { catchAsync } from "../../middleware/utils.js";

//getPlan
export const getPlan = catchAsync(async (req, res) => {
  const plan = await Plans.findById(req.params.id);
  if (!plan) {
    return res.status(404).json({ message: "Plan Not Found" });
  }
  res.status(200).json({ message: "Plan Get Successfully", plan });
});

//getPlans
export const getPlans = catchAsync(async (req, res) => {
  let { page, limit, category } = req.query;
  console.log("🚀 ~ getPlans ~ limit:", limit);
  let query = {};
  if (category) {
    query.category = category;
  }
  console.log("🚀 ~ getPlans ~ query:", query);
  limit = limit ? parseInt(limit) : 12;
  page = page ? parseInt(page) : 1;

  let plan = await Plans.find(query)
    .limit(limit)
    .skip((page - 1) * limit);
  let count = await Plans.countDocuments(query);
  plan = {
    pages: Math.ceil(count / limit),
    total: count,
    plans: plan,
  };

  return res.status(200).json({ plan, message: "Plans Get Successfully" });
});
