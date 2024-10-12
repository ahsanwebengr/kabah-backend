import Plans from "../../models/plan.js";
import { planVerificationSchema } from "../../verification/api_verification.js";
import { catchAsync, calculateDuration } from "../../middleware/utils.js";

//createPlan
export const createPlan = catchAsync(async (req, res) => {
  let check = await Plans.find({ heading: req.body.heading });
  if (check.length > 0) {
    return res.status(409).json({ error: "Plan Already Exists" });
  }
  let {
    from_date,
    to_date,
    heading,
    category,
    slug,
    duration,
    price_includes,
  } = req.body;
  slug = heading.toLowerCase();
  slug = slug.split(" ");
  slug = slug.slice(0, 2).join("-");
  req.body.slug = slug;
  duration = calculateDuration(from_date, to_date);
  req.body.duration = duration;
  if (category === "umrah") {
    delete price_includes.qurbani;
  }

  let plan = new Plans(req.body);
  await plan.save();
  res.status(201).json({});
});

// Updates images for a specific plan.

export const updateImages = catchAsync(async (req, res) => {
  console.log("Updating images", req.files)
  const planId = req.params.id;

  // Find the plan by ID
  const plan = await Plans.findById(planId);

  if (!plan) {
    return res.status(404).json({ error: "Plan not found" });
  }
    if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError });
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No files were uploaded.' });
  }
  const { thumbnail, makkah_hotel_images, medinah_hotel_images } =
    req.files || {};
  const updateData = {
      thumbnail:
      thumbnail && thumbnail.length > 0
        ? thumbnail[0].filename
        : plan.thumbnail,

      makkah_hotel: {
      ...plan.makkah_hotel,
      makkah_hotel_images: [
        ...(plan.makkah_hotel.makkah_hotel_images || []),
        ...(makkah_hotel_images
          ? makkah_hotel_images.map((file) => file.filename)
          : []),
      ],
    },
      medinah_hotel: {
      ...plan.medinah_hotel,
      medinah_hotel_images: [
        ...(plan.medinah_hotel.medinah_hotel_images || []),
        ...(medinah_hotel_images
          ? medinah_hotel_images.map((file) => file.filename)
          : []),
      ],
    },
  };

    await Plans.findByIdAndUpdate(planId, updateData, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({});
});

//getPlan
export const getPlan = catchAsync(async (req, res) => {
  const plan = await Plans.findById(req.params.id);
  if (!plan) {
    return res.status(404).json({ error: "Plan Not Found" });
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
    return res.status(404).json({ error: "Plan Not Found" });
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
  let {
    from_date,
    to_date,
    slug,
    duration,
    heading,
    category,
    price_includes,
  } = req.body;
  duration = calculateDuration(from_date, to_date);
  slug = heading.toLowerCase();
  slug = slug.split(" ");
  slug = slug.slice(0, 2).join("-");
  req.body.slug = slug;
  req.body.duration = duration;
  if (category === "umrah") {
    delete price_includes.qurbani;
  }
  const plan = await Plans.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!plan) {
    return res.status(404).json({ error: "Plan Not Found" });
  }
  res.status(200).json({ message: "Plan Updated Successfully" });
});
