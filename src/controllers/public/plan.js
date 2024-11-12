import Plans from "../../models/plan.js";
import { catchAsync } from "../../middleware/utils.js";
import NodeCache from "node-cache";
let nodeCache = new NodeCache();
//getPlan
export const getPlan = catchAsync(async (req, res) => {
  const plan = await Plans.findById(req.params.id);
  if (!plan) {
    return res.status(404).json({ error: "Plan Not Found" });
  }
  res.status(200).json({ message: "Plan Get Successfully", plan });
});

// getPlans
export const getPlans = catchAsync(async (req, res) => {
  let { page, limit, category, hotels_rating } = req.query;
  let query = {};
  if (category) {
    query.category = category;
  }
  if (hotels_rating) {
    query.hotels_rating = hotels_rating;
  }
  if (category && hotels_rating) {
    query = { category: category, hotels_rating: hotels_rating };
  }
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