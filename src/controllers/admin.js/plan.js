import slugify from "slugify";
import Plans from "../../models/plan.js";
import { planVerificationSchema } from "../../verification/api_verification.js";
import { catchAsync, calculateDuration } from "../../middleware/utils.js";

//createPlan
export const createPlan = catchAsync(async (req, res) => {
  // const { error, value } = planVerificationSchema.validate(req.body);
  // if (error) {
  //   return res.status(400).json({ error: error.details[0].message });
  // }

  let check = await Plans.find({ heading: req.body.heading });
  if (check.length > 0) {
    return res.status(409).json({ message: "Plan Already Exists" });
  }
  let { from_date, to_date, heading } = req.body;
  let duration = calculateDuration(from_date, to_date);
  let slug = heading.toLowerCase();
  slug = slug.split(" ");
  req.body.slug = slug.slice(0, 2).join("-");
  req.body.duration = duration;
  let plan = new Plans(req.body);
  await plan.save();
  res.status(201).json({ message: "Plan Created Successfully" });
});

// updateImages
export const updateImages = catchAsync(async (req, res) => {
  if (!req.file || !req.file.filename) {
    return res.status(400).json({ message: "Please upload images" });
  }
  const plan = await Plans.findByIdAndUpdate(
    req.params.id,
    { thumbnail: req.file.filename },
    { new: true }
  );

  if (!plan) {
    return res.status(404).json({ message: "Plan not found" });
  }
  res.status(200).json({ message: "Images updated successfully" });
});

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
  let query = {};
  if (category) {
    query.category = category;
  }
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

//deletePlan
export const deletePlan = catchAsync(async (req, res) => {
  const plan = await Plans.findByIdAndDelete(req.params.id);
  if (!plan) {
    return res.status(404).json({ message: "Plan Not Found" });
  }
  res.status(200).json({ message: "Plan Deleted Successfully" });
});

//delete all plans
export const deleteAllPlans = catchAsync(async (req, res) => {
  await Plans.deleteMany({});
  res.status(200).json({ message: "All Plans Deleted Successfully" });
});

//updatePlan
export const updatePlan = catchAsync(async (req, res) => {
  const { error } = plan_validationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const plan = await Plans.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!plan) {
    return res.status(404).json({ message: "Plan Not Found" });
  }
  res.status(200).json({ message: "Plan Updated Successfully", plan });
});

const value = {
  from_date: "2024-09-01T12:00:00",
  to_date: "2024-09-25T15:30:00",
};

const duration = calculateDuration(value);
